import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { Baby } from 'lucide-react'
import { ComingSoonCalculator } from '@/components/calculator/ComingSoonCalculator'

export const dynamic = 'force-dynamic'

export default async function ChildrenSavingsCalculatorPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <ComingSoonCalculator
      title="Children Savings Calculator"
      description="Plan for your children's future. Calculate education costs and monthly savings needed."
      icon={Baby}
      iconColor="bg-pink-500"
      features={[
        'Calculate college tuition costs with inflation',
        'Plan for private vs public education expenses',
        'Factor in 529 plan tax advantages',
        'Calculate monthly contributions needed per child',
        'Account for scholarships and financial aid',
        'Compare different savings strategies (529, UTMA, etc.)'
      ]}
    />
  )
}
