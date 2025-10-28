import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { Calculator } from 'lucide-react'
import { ComingSoonCalculator } from '@/components/calculator/ComingSoonCalculator'

export const dynamic = 'force-dynamic'

export default async function MortgageCalculatorPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <ComingSoonCalculator
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payments, total interest, and amortization schedule."
      icon={Calculator}
      iconColor="bg-indigo-500"
      features={[
        'Calculate monthly payments with principal and interest',
        'Include property tax, insurance, and PMI in calculations',
        'View complete amortization schedule',
        'Compare 15-year vs 30-year mortgage terms',
        'See how extra payments reduce interest and loan term',
        'Calculate refinancing savings potential'
      ]}
    />
  )
}
