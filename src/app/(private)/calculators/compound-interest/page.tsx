import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { CompoundInterestCalculator } from './CompoundInterestCalculator'

export const dynamic = 'force-dynamic'

export default async function CompoundInterestCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ calculation?: string }>
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const params = await searchParams
  const calculationId = params.calculation || null

  return <CompoundInterestCalculator calculationId={calculationId} />
}
