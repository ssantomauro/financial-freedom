# PostHog Analytics Setup Guide

This guide explains how PostHog analytics is integrated into the Financial Freedom app and how to set it up.

## What is PostHog?

PostHog is a comprehensive product analytics platform that helps you understand user behavior through:
- Event tracking (what users click, what actions they take)
- Session recordings (watch how users interact with your app)
- Funnels (track conversion rates through your payment flow)
- Feature flags (A/B testing and gradual rollouts)
- User identification (link events to specific users)

## Getting Your PostHog API Keys

### 1. Sign Up for PostHog

1. Go to [https://posthog.com](https://posthog.com)
2. Click "Get started - free"
3. Create your account (they offer a generous free tier)

### 2. Get Your API Key

1. After signing up, you'll be taken to your PostHog dashboard
2. Click on your project name in the top left
3. Go to "Project Settings"
4. Find your **Project API Key** - this is your `NEXT_PUBLIC_POSTHOG_KEY`
5. The default host is `https://app.posthog.com` (US region) or `https://eu.posthog.com` (EU region)

### 3. Add to Your Environment Variables

Add these to your `.env.local` file:

```bash
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Important:** The `NEXT_PUBLIC_` prefix makes these variables available in the browser (client-side).

### 4. Restart Your Development Server

```bash
npm run dev
```

## What Events Are Being Tracked?

### Authentication Events
- **signup_started** - User lands on signup page
- **signup_completed** - User successfully creates account
- **login_started** - User lands on login page
- **login_completed** - User successfully logs in
- **logout** - User logs out

### Calculator Usage
- **calculator_opened** - User opens a calculator
- **calculator_started** - User begins entering data
- **calculation_completed** - User completes a calculation
- **calculation_saved** - Calculation is saved to history
- **past_calculation_opened** - User opens a calculation from history

### Paywall & Conversion Funnel
- **paywall_shown** - Paywall modal is displayed
- **paywall_dismissed** - User closes paywall without upgrading
- **upgrade_clicked** - User clicks "Get Lifetime Access"
- **payment_initiated** - Stripe checkout session created
- **payment_completed** - User successfully completes payment
- **payment_cancelled** - User cancels payment on Stripe

### Features
- **math_modal_opened** - User opens the math explanation modal

### Navigation
- **dashboard_viewed** - User views dashboard
- **history_page_viewed** - User views calculation history
- **contact_page_viewed** - User views contact page
- **about_page_viewed** - User views about page

## User Identification

When a user logs in or signs up, they are automatically identified in PostHog using their Supabase user ID. This allows you to:

1. See all events for a specific user
2. Track user journeys from signup to payment
3. Segment users by properties (has lifetime access, email, etc.)

User properties tracked:
- `email` - User's email address
- `name` - User's full name
- `has_lifetime_access` - Whether user has paid for lifetime access
- `signup_date` - When the user signed up
- `last_login` - When the user last logged in

## Viewing Your Analytics

### 1. Access PostHog Dashboard

Go to [https://app.posthog.com](https://app.posthog.com) and log in.

### 2. View Events

1. Click "Events" in the left sidebar
2. You'll see a real-time stream of all events
3. Click on any event to see its properties

### 3. Create Insights

1. Click "Insights" in the left sidebar
2. Click "New insight"
3. Select the events you want to analyze

**Example: Track Conversion Funnel**
1. Create a new funnel insight
2. Add steps:
   - Step 1: `paywall_shown`
   - Step 2: `upgrade_clicked`
   - Step 3: `payment_initiated`
   - Step 4: `payment_completed`
3. See your conversion rate at each step!

### 4. Session Recordings

1. Click "Session recordings" in the left sidebar
2. Watch actual recordings of users interacting with your app
3. Filter by user properties or events

### 5. User Tracking

1. Click "Persons" in the left sidebar
2. Search for a specific user by email
3. See their entire event history and properties

## Key Metrics to Track

### Conversion Metrics
- **Paywall to Payment Conversion Rate**: What % of users who see the paywall actually pay?
  - Funnel: `paywall_shown` → `payment_completed`

- **Free to Paid Conversion Rate**: What % of users upgrade?
  - Segment users by `has_lifetime_access`

### Engagement Metrics
- **Calculator Usage**: Which calculators are most popular?
  - Count events by `calculator_opened` grouped by `calculator` property

- **Calculation Completion Rate**: Do users finish calculations?
  - Funnel: `calculator_started` → `calculation_completed`

### User Behavior
- **Time to First Calculation**: How long after signup do users calculate?
- **Calculations Before Paywall**: How many free calculations do users use before hitting paywall?
- **Return Rate**: How many users come back after first visit?

## Development vs Production

### Development
- Events are tracked in development with `posthog.debug()` enabled
- You'll see console logs for every event
- All events go to the same PostHog project

### Production
- Debug mode is disabled
- Events are silently tracked
- Consider creating a separate PostHog project for production

## Privacy & GDPR Compliance

PostHog is GDPR compliant and offers:
- **Data residency**: Choose US or EU hosting
- **User anonymization**: Users can opt-out
- **Data retention**: Configure how long to keep data

To respect user privacy:
1. Add a cookie consent banner (not yet implemented)
2. Call `posthog.opt_out_capturing()` if user declines
3. Don't track sensitive financial data in events

## Troubleshooting

### Events Not Showing Up?

1. **Check environment variables**: Make sure `NEXT_PUBLIC_POSTHOG_KEY` is set
2. **Restart dev server**: Changes to `.env.local` require restart
3. **Check browser console**: Look for PostHog debug logs or errors
4. **Verify API key**: Make sure you copied the full key from PostHog

### Events Appearing Twice?

This can happen in development due to React StrictMode. It's normal and won't happen in production.

### User Not Identified?

Make sure the user is logged in and the `PostHogIdentifier` component is rendered on the dashboard page.

## Cost & Limits

PostHog Free Tier includes:
- **1 million events per month** - plenty for early stage
- **5,000 session recordings per month**
- **Unlimited team members**
- **1 year data retention**

After free tier:
- Events: $0.00031 per event (very cheap)
- Session recordings: $0.005 per recording

## Files Modified for PostHog Integration

### Core Infrastructure
- `src/lib/posthog/client.ts` - PostHog initialization
- `src/lib/posthog/provider.tsx` - PostHog provider component
- `src/lib/posthog/hooks.ts` - usePostHog hook and event constants
- `src/app/layout.tsx` - Wraps app in PostHogProvider

### Analytics Components
- `src/components/analytics/PostHogIdentifier.tsx` - Identifies logged-in users
- `src/components/analytics/DashboardTracker.tsx` - Tracks dashboard views

### Page Tracking
- `src/app/(private)/dashboard/page.tsx` - User identification + dashboard tracking
- `src/app/(private)/history/CalculationHistoryFull.tsx` - History page tracking
- `src/app/(public)/contact/ContactPageTracker.tsx` - Contact page tracking
- `src/app/(public)/about/AboutPageTracker.tsx` - About page tracking

### Feature Tracking
- `src/app/(private)/calculators/buy-vs-rent/BuyVsRentCalculator.tsx` - Calculator events
- `src/components/calculator/PaywallModal.tsx` - Paywall events
- `src/app/(private)/payment/success/SuccessPageContent.tsx` - Payment success
- `src/app/(private)/payment/cancel/page.tsx` - Payment cancellation

### Authentication Tracking
- `src/app/(auth)/signup/page.tsx` - Signup events
- `src/app/(auth)/login/page.tsx` - Login events
- `src/components/auth/LogoutButton.tsx` - Logout event

## Next Steps

1. **Set up your PostHog account** and add API keys
2. **Test the integration** by clicking around your app and checking PostHog dashboard
3. **Create conversion funnels** to track your key metrics
4. **Set up session recordings** to watch user behavior
5. **Create dashboards** with your most important metrics
6. **Set up alerts** for important events (new payment, etc.)

## Support

- PostHog Docs: [https://posthog.com/docs](https://posthog.com/docs)
- PostHog Community: [https://posthog.com/questions](https://posthog.com/questions)
- PostHog Support: support@posthog.com
