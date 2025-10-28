import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { Target } from 'lucide-react'
import { ComingSoonCalculator } from '@/components/calculator/ComingSoonCalculator'

export const dynamic = 'force-dynamic'

export default async function RetirementCalculatorPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <ComingSoonCalculator
      title="Retirement Calculator"
      description="Plan for a comfortable retirement. Calculate how much you need to save and when you can retire."
      icon={Target}
      iconColor="bg-purple-500"
      features={[
        'Calculate your retirement savings goal based on desired lifestyle',
        'Factor in Social Security and pension benefits',
        'Account for inflation and healthcare costs',
        'Determine optimal retirement age for your situation',
        'See monthly savings needed to reach your goal',
        'Project your retirement income and expenses'
      ]}
    />
  )
}
