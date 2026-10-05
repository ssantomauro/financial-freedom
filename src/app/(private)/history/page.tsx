import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { CalculationHistoryFull } from './CalculationHistoryFull'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return <CalculationHistoryFull />
}
