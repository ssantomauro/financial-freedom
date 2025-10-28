import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { TrendingUp } from 'lucide-react'
import { ComingSoonCalculator } from '@/components/calculator/ComingSoonCalculator'

export const dynamic = 'force-dynamic'

export default async function CompoundInterestCalculatorPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <ComingSoonCalculator
      title="Compound Interest Calculator"
      description="See how your money grows over time with compound interest. Visualize the power of consistent investing."
      icon={TrendingUp}
      iconColor="bg-green-500"
      features={[
        'Calculate compound interest with various compounding frequencies',
        'Add regular monthly or annual contributions',
        'See detailed year-by-year growth breakdown',
        'Interactive charts showing principal vs interest growth',
        'Compare different investment scenarios side-by-side',
        'Export results and projections for your records'
      ]}
    />
  )
}
