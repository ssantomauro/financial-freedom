import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { PiggyBank } from 'lucide-react'
import { ComingSoonCalculator } from '@/components/calculator/ComingSoonCalculator'

export const dynamic = 'force-dynamic'

export default async function SavingsCalculatorPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <ComingSoonCalculator
      title="Savings Goal Calculator"
      description="Set and achieve your savings goals. Calculate monthly contributions needed for any financial target."
      icon={PiggyBank}
      iconColor="bg-orange-500"
      features={[
        'Set multiple savings goals (vacation, car, home, etc.)',
        'Calculate monthly deposits needed to reach your goal',
        'Factor in initial savings and expected interest rate',
        'See progress timeline and milestones',
        'Adjust timelines to see how it affects monthly savings',
        'Track multiple goals simultaneously'
      ]}
    />
  )
}
