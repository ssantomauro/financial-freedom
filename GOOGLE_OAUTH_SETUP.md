# Google OAuth Setup Guide

## The Error You're Seeing

`Error 400: redirect_uri_mismatch` means the redirect URI in your request doesn't match what's configured in Google Cloud Console.

## Quick Fix Steps

### Step 1: Get Your Supabase Project URL

1. Open your `.env.local` file
2. Find your `NEXT_PUBLIC_SUPABASE_URL`
3. It should look like: `https://xxxxxxxxxxxxx.supabase.co`

### Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one)
3. Navigate to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID or create a new one:
   - Click **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Application type: **Web application**
   - Name: `Financial Freedom` (or any name)

5. **Add Authorized Redirect URIs** - This is the critical part!

   Add this EXACT URL (replace `xxxxxxxxxxxxx` with your Supabase project ID):
   ```
   https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback
   ```

   Example:
   ```
   https://abcdefghijklmn.supabase.co/auth/v1/callback
   ```

6. Click **Save**

### Step 3: Configure Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Find **Google** and toggle it ON
5. Enter your credentials from Google Cloud Console:
   - **Client ID**: Copy from Google Cloud Console
   - **Client Secret**: Copy from Google Cloud Console
6. Click **Save**

### Step 4: Verify Configuration

The Supabase configuration should show:
- ✅ Google provider enabled
- ✅ Client ID entered
- ✅ Client Secret entered
- ✅ Redirect URL automatically set by Supabase

### Step 5: Test

1. Make sure your app is running: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click **Continue with Google**
4. Should redirect to Google sign-in
5. After signing in, should redirect back to your app

## Common Issues

### Issue: "redirect_uri_mismatch"

**Cause**: The redirect URI in Google Cloud Console doesn't match Supabase's callback URL.

**Solution**:
- Make sure you added the EXACT Supabase URL: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
- Check for typos
- Check for extra spaces
- Make sure it's HTTPS, not HTTP

### Issue: "Access blocked: Authorization Error"

**Cause**: Your Google Cloud project is in testing mode and the user email isn't added as a test user.

**Solution**:
1. Go to **APIs & Services** → **OAuth consent screen**
2. Either:
   - **Option A**: Add the email as a test user
   - **Option B**: Publish the app (change from Testing to Production)

### Issue: "The OAuth client was not found"

**Cause**: Wrong Client ID or Client Secret in Supabase.

**Solution**: Double-check the credentials in Supabase match Google Cloud Console exactly.

## Finding Your Supabase Project ID

Your Supabase URL format: `https://[PROJECT_ID].supabase.co`

Example:
- Full URL: `https://abcdefghijklmn.supabase.co`
- Project ID: `abcdefghijklmn`

## Complete Google OAuth Configuration Checklist

### Google Cloud Console
- [ ] Project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Application type set to "Web application"
- [ ] Authorized redirect URI added: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
- [ ] Client ID copied
- [ ] Client Secret copied

### Supabase Dashboard
- [ ] Google provider enabled
- [ ] Client ID entered
- [ ] Client Secret entered
- [ ] Configuration saved

### Test Users (if in Testing mode)
- [ ] Your email added as test user in Google Cloud Console
- OR [ ] App published to production

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set correctly in `.env.local`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set correctly in `.env.local`

## Detailed Setup Instructions

### 1. Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click the project dropdown (top left)
3. Click **NEW PROJECT**
4. Name: "Financial Freedom" (or any name)
5. Click **CREATE**

### 2. Configure OAuth Consent Screen

1. Navigate to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (unless you have Google Workspace)
3. Click **CREATE**
4. Fill in required fields:
   - App name: "Financial Freedom"
   - User support email: Your email
   - Developer contact: Your email
5. Click **SAVE AND CONTINUE**
6. Scopes: Click **SAVE AND CONTINUE** (default scopes are fine)
7. Test users:
   - If in testing mode: Add your email
   - Click **ADD USERS** → Enter your email → **ADD**
8. Click **SAVE AND CONTINUE**
9. Review and click **BACK TO DASHBOARD**

### 3. Create OAuth Credentials

1. Navigate to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. If prompted, configure OAuth consent screen (follow step 2)
4. Application type: **Web application**
5. Name: "Financial Freedom Web"
6. **Authorized JavaScript origins** (optional):
   - Add: `http://localhost:3000` (for local dev)
7. **Authorized redirect URIs** (REQUIRED):
   - Click **+ ADD URI**
   - Enter: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
   - Replace `YOUR_PROJECT_ID` with your actual Supabase project ID
8. Click **CREATE**
9. Copy the **Client ID** and **Client Secret** (you'll need these next)

### 4. Configure Supabase

1. Go to https://app.supabase.com
2. Select your project
3. Navigate to **Authentication** (left sidebar)
4. Click **Providers**
5. Scroll down to find **Google**
6. Toggle **Enable Sign in with Google** to ON
7. Enter the credentials from Google Cloud Console:
   - **Client ID (for OAuth)**: Paste the Client ID
   - **Client Secret (for OAuth)**: Paste the Client Secret
8. Click **Save**

## Testing the Setup

### Manual Test

```bash
# 1. Start your dev server
npm run dev

# 2. Open browser to
http://localhost:3000/login

# 3. Click "Continue with Google"
# 4. Should see Google sign-in page
# 5. Select your Google account
# 6. Should redirect back to your app
# 7. Check browser console for any errors
```

### Check Database

After successful login:

```bash
# Using Prisma Studio
npx prisma studio

# Or using psql
psql $DATABASE_URL
SELECT * FROM users;
```

You should see a new user record with:
- Email from Google
- Provider: "google"
- supabaseId: (UUID from Supabase auth)

## Troubleshooting Commands

```bash
# Check environment variables
cat .env.local | grep SUPABASE

# Check Supabase connection
npx tsx scripts/verify-setup.ts

# View Prisma schema
cat prisma/schema.prisma

# Check for users in database
npx prisma studio
```

## Example Configuration

### Google Cloud Console

**Authorized redirect URIs:**
```
https://abcdefghijklmn.supabase.co/auth/v1/callback
```

### Supabase Dashboard

**Google Provider:**
- Enabled: ✅
- Client ID: `123456789-abc123.apps.googleusercontent.com`
- Client Secret: `GOCSPX-abc123_your_secret_here`

### .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijklmn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
```

## Need Help?

1. **Check Supabase logs**: Dashboard → Logs → API Logs
2. **Check browser console**: F12 → Console tab
3. **Check terminal**: Look for errors in `npm run dev` output
4. **Verify credentials**: Double-check Client ID and Secret match

## Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [OAuth 2.0 Debugger](https://oauthdebugger.com/)
