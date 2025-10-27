# Authentication Quick Reference

## Environment Setup

```bash
# 1. Copy environment variables
cp .env.example .env.local

# 2. Update with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxxxx"

# 3. Run migration
npx prisma migrate dev --name add_auth_fields
npx prisma generate

# 4. Start dev server
npm run dev
```

## Common Code Snippets

### Get Current User (Server Component)

```typescript
import { getUser } from '@/lib/auth/getUser'

const user = await getUser()
if (!user) {
  redirect('/login')
}
```

### Get Current User (Client Component)

```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Require Authentication

```typescript
import { requireUser } from '@/lib/auth/getUser'

const user = await requireUser() // Throws error if not authenticated
```

### Sign Up Programmatically

```typescript
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, name })
})
```

### Sign In Programmatically

```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

### Sign Out

```typescript
const response = await fetch('/api/auth/logout', {
  method: 'POST'
})
```

### Add Logout Button

```typescript
import { LogoutButton } from '@/components/auth'

<LogoutButton className="text-red-600">
  Sign Out
</LogoutButton>
```

### Add User Profile Display

```typescript
import { UserProfile } from '@/components/auth'

<UserProfile />
```

### Protect a Route

Add to `src/middleware.ts`:

```typescript
const protectedPaths = ['/dashboard', '/profile']
```

### Listen to Auth State Changes

```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

const { data: { subscription } } = supabase.auth.onAuthStateChange(
  (event, session) => {
    console.log(event, session)
  }
)

// Cleanup
subscription.unsubscribe()
```

## API Endpoints Reference

| Endpoint | Method | Body | Response |
|----------|--------|------|----------|
| `/api/auth/signup` | POST | `{ email, password, name? }` | User object |
| `/api/auth/login` | POST | `{ email, password }` | User object |
| `/api/auth/logout` | POST | - | Success message |
| `/api/auth/oauth` | POST | `{ provider: 'google' \| 'apple' }` | `{ url }` |
| `/api/auth/reset-password` | POST | `{ email }` | Success message |
| `/api/auth/update-password` | POST | `{ password }` | Success message |
| `/api/auth/callback` | GET | Query params | Redirect |

## Page Routes

| Route | Purpose |
|-------|---------|
| `/login` | Sign in with email/password or OAuth |
| `/signup` | Create new account |
| `/reset-password` | Request password reset |
| `/reset-password?type=recovery` | Update password form |
| `/verify-email` | Email verification confirmation |

## Supabase Dashboard URLs

```
Project Settings: https://app.supabase.com/project/_/settings/api
Auth Settings: https://app.supabase.com/project/_/auth/users
Providers: https://app.supabase.com/project/_/auth/providers
Email Templates: https://app.supabase.com/project/_/auth/templates
```

## Troubleshooting Commands

```bash
# Check if Supabase packages are installed
npm list @supabase/supabase-js @supabase/ssr

# Regenerate Prisma client
npx prisma generate

# View Prisma schema
cat prisma/schema.prisma

# Check environment variables
cat .env.local

# Clear Next.js cache
rm -rf .next

# View middleware
cat src/middleware.ts
```

## Testing Flow

```bash
# 1. Start dev server
npm run dev

# 2. Navigate to signup
open http://localhost:3000/signup

# 3. Create account and check email
# 4. Click verification link
# 5. Sign in
# 6. Test protected routes
# 7. Test logout
# 8. Test password reset
```

## Common Issues & Solutions

### "Invalid token" error
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Ensure they match your Supabase project

### Email not received
- Check Supabase email settings
- Verify SMTP configuration
- Check spam folder
- Look at Supabase logs

### OAuth not working
- Verify redirect URLs in provider settings
- Check OAuth credentials
- Clear browser cookies

### Session not persisting
- Check middleware configuration
- Verify cookies are enabled in browser
- Check for errors in browser console

### Protected route not redirecting
- Check `src/middleware.ts` configuration
- Verify path is in `protectedPaths` array
- Check `matcher` config in middleware

## Component Imports

```typescript
// Individual imports
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthInput } from '@/components/auth/AuthInput'
import { Alert } from '@/components/auth/Alert'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import { Divider } from '@/components/auth/Divider'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { UserProfile } from '@/components/auth/UserProfile'

// Or use index import
import { AuthButton, AuthInput, Alert } from '@/components/auth'
```

## User Object Structure

```typescript
{
  id: string                    // UUID
  email: string                 // User's email
  user_metadata: {              // Custom data
    name?: string
    avatar_url?: string
  }
  app_metadata: {               // System data
    provider: string
    providers: string[]
  }
  created_at: string
  confirmed_at?: string         // Email verification timestamp
  last_sign_in_at?: string
}
```

## Environment Variables Checklist

```bash
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ DATABASE_URL
⚪ SMTP_HOST (optional)
⚪ SMTP_PORT (optional)
⚪ SMTP_USER (optional)
⚪ SMTP_PASSWORD (optional)
⚪ SMTP_FROM (optional)
```

## Links

- [Full Setup Guide](AUTH_SETUP.md)
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
