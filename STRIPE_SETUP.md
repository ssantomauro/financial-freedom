# Stripe Payment Integration Setup

This guide will help you set up Stripe payment processing for the lifetime subscription feature.

## Prerequisites

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers > API keys**
3. Copy the following keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

## Step 2: Add Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important**:
- Use test keys (`pk_test_` and `sk_test_`) for development
- Use live keys (`pk_live_` and `sk_live_`) for production
- Never commit your `.env.local` file to git

## Step 3: Set Up Webhook

Webhooks are required to receive payment confirmation events from Stripe.

### For Local Development (using Stripe CLI):

1. Install the Stripe CLI: https://stripe.com/docs/stripe-cli
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Other platforms - see https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`) and add it to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

5. Keep this terminal window running while testing payments locally

### For Production (Vercel/Production Server):

1. Go to [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter your endpoint URL:
   ```
   https://your-domain.com/api/stripe/webhook
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to your production environment variables in Vercel:
   - Go to your Vercel project settings
   - Navigate to **Environment Variables**
   - Add `STRIPE_WEBHOOK_SECRET` with the value

## Step 4: Configure Vercel Environment Variables

In your Vercel project settings:

1. Go to **Settings > Environment Variables**
2. Add these variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_your_key_here
   STRIPE_SECRET_KEY = sk_live_your_secret_key_here
   STRIPE_WEBHOOK_SECRET = whsec_your_webhook_secret_here
   ```
3. Select all environments (Production, Preview, Development)
4. Click **Save**

## Step 5: Test the Payment Flow

### Using Stripe Test Mode:

1. Use test card numbers from [Stripe Testing Cards](https://stripe.com/docs/testing):
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`

2. Use any future expiry date (e.g., 12/34)
3. Use any 3-digit CVC (e.g., 123)
4. Use any billing ZIP code

### Test Flow:

1. Sign up or log in to your app
2. Use a calculator 3 times to trigger the paywall
3. Click "Get Lifetime Access Now"
4. You should be redirected to Stripe Checkout
5. Enter test card: `4242 4242 4242 4242`
6. Complete the payment
7. You should be redirected to `/payment/success`
8. Check the database - user's `hasLifetimeAccess` should be `true`

## Step 6: Monitor Payments

### Stripe Dashboard

- View all payments: [Stripe Dashboard > Payments](https://dashboard.stripe.com/payments)
- View webhooks: [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
- View logs: [Stripe Dashboard > Developers > Logs](https://dashboard.stripe.com/logs)

### Database Verification

Check that the webhook updated the user:

```sql
SELECT email, "hasLifetimeAccess", "subscriptionDate"
FROM users
WHERE "hasLifetimeAccess" = true;
```

## Troubleshooting

### Webhook not receiving events:

1. Check that Stripe CLI is running (for local dev)
2. Check webhook secret is correct in `.env.local`
3. Check webhook endpoint is accessible:
   ```bash
   curl -X POST http://localhost:3000/api/stripe/webhook
   ```
4. Check Vercel logs for webhook errors

### Payment succeeds but user not upgraded:

1. Check Stripe Dashboard > Webhooks > Events
2. Look for `checkout.session.completed` event
3. Check if webhook delivery succeeded
4. Check server logs for errors
5. Verify `STRIPE_WEBHOOK_SECRET` is correct

### Customer not receiving email receipt:

- Stripe sends receipts automatically to the email used at checkout
- Check Stripe Dashboard > Settings > Emails to configure receipt settings

## Security Best Practices

1. ✅ **Never expose secret keys** - Only use `NEXT_PUBLIC_` prefix for publishable key
2. ✅ **Verify webhook signatures** - Always validate webhook events (already implemented)
3. ✅ **Use HTTPS in production** - Webhooks require HTTPS
4. ✅ **Keep Stripe.js up to date** - Regular security updates
5. ✅ **Monitor for suspicious activity** - Use Stripe Radar

## Going Live Checklist

Before switching from test mode to live mode:

- [ ] Replace test keys with live keys
- [ ] Set up production webhook endpoint
- [ ] Test with real card (small amount)
- [ ] Configure Stripe receipt emails
- [ ] Set up Stripe Radar for fraud prevention
- [ ] Enable 3D Secure (SCA) if required in your region
- [ ] Update Terms of Service with refund policy
- [ ] Test refund process
- [ ] Set up Stripe tax settings (if applicable)

## Pricing Configuration

Current pricing in the code:
- **Amount**: $9.00 USD (one-time payment - promotional pricing for first 100 users)
- **Location**: `src/app/api/stripe/create-checkout-session/route.ts`
- **Line**: `unit_amount: 900` (in cents)

To change the price:
1. Update `unit_amount` in the checkout session route (price in cents)
2. Update display price in `PaywallModal.tsx`
3. Update price in success page if shown

## Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Testing](https://stripe.com/docs/testing)

## Common Error Messages

| Error | Solution |
|-------|----------|
| `No such customer` | User email doesn't exist in Stripe |
| `Invalid signature` | Wrong webhook secret or request modified |
| `Rate limit exceeded` | Too many API requests, implement retry logic |
| `Card declined` | Test with different test card |

---

**Need Help?** Check the [Stripe support documentation](https://support.stripe.com/) or contact Stripe support.
