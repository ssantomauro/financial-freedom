# Prisma Schema Guide

## Overview

The Prisma schema has been designed to work seamlessly with Supabase Auth while maintaining your application's data in PostgreSQL.

## Schema Structure

### User Model

```prisma
model User {
  id            String   @id @default(uuid()) @db.Uuid
  email         String   @unique
  name          String?
  emailVerified Boolean  @default(false)
  provider      String?  // 'email', 'google', 'apple'
  supabaseId    String?  @unique // Supabase auth.users.id
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  posts         Post[]
  calculations  Calculation[]
}
```

**Key Points:**
- `id`: UUID primary key (matches Supabase user ID for new users)
- `supabaseId`: Reference to Supabase `auth.users.id`
- `email`: User's email (synced from Supabase)
- `emailVerified`: Whether email is confirmed
- `provider`: Authentication method used

### Post Model (Example)

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String   @db.Uuid
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Purpose:** Example model for blog posts or content. Can be removed if not needed.

### Calculation Model

```prisma
model Calculation {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      String   // 'buy-vs-rent', 'mortgage', etc.
  name      String?
  data      Json     // Calculation inputs and results
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Purpose:** Store user's financial calculations with flexible JSON data structure.

**Example Usage:**
```typescript
await prisma.calculation.create({
  data: {
    userId: user.id,
    type: 'buy-vs-rent',
    name: 'SF Bay Area Comparison',
    data: {
      inputs: {
        homePrice: 800000,
        rentAmount: 3500,
        // ... other inputs
      },
      results: {
        breakEvenYears: 7.5,
        recommendation: 'rent'
      }
    }
  }
})
```

## Database Schema

After running migrations, your PostgreSQL database will have:

**Tables:**
- `users` - Application user profiles
- `posts` - Example content table
- `calculations` - User's saved calculations

**Indexes:**
- `users_email_idx` - Fast email lookups
- `users_supabaseId_idx` - Fast Supabase ID lookups
- `posts_authorId_idx` - Fast user posts queries
- `calculations_userId_idx` - Fast user calculations queries
- `calculations_type_idx` - Filter by calculation type
- `calculations_createdAt_idx` - Sort by date

## Syncing Users

### After Signup/Login

Use the `syncUserToDatabase` helper to create/update user records:

```typescript
import { syncUserToDatabase } from '@/lib/auth/syncUser'
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

if (user) {
  await syncUserToDatabase(user)
}
```

### In API Routes

Update the signup route to sync users:

```typescript
// In /api/auth/signup/route.ts
const { data, error } = await supabase.auth.signUp({...})

if (data.user) {
  await syncUserToDatabase(data.user)
}
```

### In OAuth Callback

Update the callback route:

```typescript
// In /api/auth/callback/route.ts
const { data: { user } } = await supabase.auth.getUser()

if (user) {
  await syncUserToDatabase(user)
}
```

## Common Queries

### Get User with Calculations

```typescript
const user = await prisma.user.findUnique({
  where: { supabaseId: supabaseUserId },
  include: {
    calculations: {
      orderBy: { createdAt: 'desc' },
      take: 10
    }
  }
})
```

### Get Calculations by Type

```typescript
const calculations = await prisma.calculation.findMany({
  where: {
    userId: user.id,
    type: 'buy-vs-rent'
  },
  orderBy: { createdAt: 'desc' }
})
```

### Create Calculation

```typescript
const calculation = await prisma.calculation.create({
  data: {
    userId: user.id,
    type: 'mortgage',
    name: 'Home Loan Analysis',
    data: {
      loanAmount: 500000,
      interestRate: 6.5,
      term: 30,
      monthlyPayment: 3160
    }
  }
})
```

### Update User Profile

```typescript
const user = await prisma.user.update({
  where: { supabaseId: supabaseUserId },
  data: {
    name: 'New Name',
    updatedAt: new Date()
  }
})
```

## Migration Commands

### Create a New Migration

```bash
npx prisma migrate dev --name description_of_changes
```

### Apply Migrations (Production)

```bash
npx prisma migrate deploy
```

### Reset Database (Development Only)

```bash
npx prisma migrate reset
```

### Generate Prisma Client

```bash
npx prisma generate
```

### View Database in Prisma Studio

```bash
npx prisma studio
```

## Schema Modifications

### Adding a New Field

1. Update `schema.prisma`:
```prisma
model User {
  // ... existing fields
  avatar    String?
}
```

2. Create migration:
```bash
npx prisma migrate dev --name add_user_avatar
```

### Adding a New Model

1. Add to `schema.prisma`:
```prisma
model Budget {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  user      User     @relation(fields: [userId], references: [id])
  name      String
  amount    Float
  createdAt DateTime @default(now())

  @@index([userId])
}
```

2. Update User model:
```prisma
model User {
  // ... existing fields
  budgets Budget[]
}
```

3. Create migration:
```bash
npx prisma migrate dev --name add_budget_model
```

## Best Practices

1. **Always use transactions** for related operations:
```typescript
await prisma.$transaction([
  prisma.user.create({...}),
  prisma.calculation.create({...})
])
```

2. **Use includes sparingly** - only fetch related data when needed

3. **Add indexes** for frequently queried fields

4. **Use enums** for fixed value sets:
```prisma
enum CalculationType {
  BUY_VS_RENT
  MORTGAGE
  INVESTMENT
  RETIREMENT
}

model Calculation {
  type CalculationType
  // ...
}
```

5. **Cascade deletes** to maintain referential integrity

6. **Validate data** before database operations

## Troubleshooting

### "Migration is already applied"
```bash
npx prisma migrate resolve --applied <migration_name>
```

### "Database is out of sync"
```bash
npx prisma db push  # Development only
```

### "Cannot connect to database"
Check `DATABASE_URL` in `.env.local`

### "Prisma Client not found"
```bash
npx prisma generate
```

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
