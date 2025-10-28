import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { BuyVsRentCalculator } from './BuyVsRentCalculator'

export const dynamic = 'force-dynamic'

export default async function BuyVsRentCalculatorPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return <BuyVsRentCalculator />
}
