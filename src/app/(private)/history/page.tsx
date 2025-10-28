import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { CalculationHistoryFull } from './CalculationHistoryFull'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's lifetime access status
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    select: { hasLifetimeAccess: true },
  })

  const hasLifetimeAccess = dbUser?.hasLifetimeAccess || false

  // Redirect non-subscribers to dashboard
  if (!hasLifetimeAccess) {
    redirect('/dashboard')
  }

  return <CalculationHistoryFull />
}
