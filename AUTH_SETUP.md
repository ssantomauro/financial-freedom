# Authentication Setup Guide

This guide will help you set up authentication for your Financial Freedom application using Supabase.

## Prerequisites

- A Supabase account ([Sign up here](https://supabase.com))
- A Supabase project created
- SMTP email credentials (Gmail, SendGrid, etc.)

## Step 1: Configure Supabase

### 1.1 Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - Project URL (starts with `https://`)
   - Anon/Public key

### 1.2 Update Environment Variables

Update your `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```

### 1.3 Configure Email Settings in Supabase

1. Go to **Authentication** → **Email Templates** in your Supabase dashboard
2. Customize the email templates for:
   - Confirmation (email verification)
   - Magic Link
   - Password Reset
   - Email Change

3. Go to **Authentication** → **Settings** → **SMTP Settings**
4. Configure your SMTP provider settings (or use Supabase's default)

> **Note:** For production, it's recommended to use a dedicated email service like SendGrid, Mailgun, or Amazon SES.

### 1.4 Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your application URL:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. Add **Redirect URLs**:
   - `http://localhost:3000/api/auth/callback` (development)
   - `https://yourdomain.com/api/auth/callback` (production)

## Step 2: Configure OAuth Providers

### 2.1 Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
5. Copy the Client ID and Client Secret
6. In Supabase Dashboard:
   - Go to **Authentication** → **Providers**
   - Enable **Google**
   - Paste your Client ID and Client Secret
   - Save

### 2.2 Apple Sign In

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Create a new Service ID
3. Configure Sign in with Apple:
   - Return URLs:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
4. Generate a private key for Sign in with Apple
5. In Supabase Dashboard:
   - Go to **Authentication** → **Providers**
   - Enable **Apple**
   - Enter your Service ID, Team ID, and Key ID
   - Upload your private key
   - Save

## Step 3: Configure Email Verification

### Enable Email Confirmation

1. Go to **Authentication** → **Settings** in Supabase
2. Enable **Email Confirmations**
3. Set **Confirm email** to ON
4. Configure **Email confirmation redirect URL**:
   - Development: `http://localhost:3000/verify-email`
   - Production: `https://yourdomain.com/verify-email`

## Step 4: Update Database Schema

Run the Prisma migration to update your database schema:

```bash
npx prisma migrate dev --name add_auth_fields
npx prisma generate
```

## Step 5: Test Authentication

### Email/Password Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/signup`
3. Create a new account with email and password
4. Check your email for verification link
5. Click the verification link
6. Sign in at `http://localhost:3000/login`

### OAuth Authentication

1. Navigate to `http://localhost:3000/login`
2. Click "Continue with Google" or "Continue with Apple"
3. Complete the OAuth flow
4. You should be redirected back to your application

### Password Reset

1. Navigate to `http://localhost:3000/reset-password`
2. Enter your email address
3. Check your email for reset link
4. Click the link and set a new password
5. Sign in with your new password

## Step 6: Protecting Routes

Routes are automatically protected via middleware. Update the protected paths in `src/middleware.ts`:

```typescript
const protectedPaths = ['/calculators', '/dashboard', '/profile']
```

## Available Auth Pages

- **Login**: `/login`
- **Sign Up**: `/signup`
- **Reset Password**: `/reset-password`
- **Verify Email**: `/verify-email`

## API Endpoints

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in with email/password
- `POST /api/auth/logout` - Sign out
- `POST /api/auth/oauth` - Initiate OAuth flow
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/update-password` - Update password
- `GET /api/auth/callback` - OAuth callback handler

## Getting Current User

### In Server Components

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <div>Hello {user.email}</div>
}
```

### In Client Components

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return <div>Hello {user?.email}</div>
}
```

## Troubleshooting

### Email verification not working
- Check SMTP settings in Supabase dashboard
- Verify email templates are configured
- Check spam folder
- Ensure redirect URLs are correct

### OAuth not working
- Verify OAuth credentials are correct
- Check redirect URLs match exactly
- Ensure OAuth providers are enabled in Supabase
- Clear browser cookies and try again

### Session not persisting
- Check middleware configuration
- Verify cookies are being set correctly
- Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correct

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. Use environment-specific URLs in Supabase settings
3. Enable Row Level Security (RLS) in Supabase
4. Regularly rotate JWT secrets
5. Use HTTPS in production
6. Enable 2FA for admin accounts
7. Monitor authentication logs in Supabase dashboard

## Next Steps

- Set up Row Level Security (RLS) policies in Supabase
- Customize email templates
- Add user profile management
- Implement role-based access control
- Add social profile data sync
- Set up analytics tracking

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
