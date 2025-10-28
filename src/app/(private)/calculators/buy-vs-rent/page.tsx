import { Suspense } from 'react'
import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { BuyVsRentCalculator } from './BuyVsRentCalculator'

export const dynamic = 'force-dynamic'

export default async function BuyVsRentCalculatorPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <Suspense
      fallback={
        <div className="py-8 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <BuyVsRentCalculator />
    </Suspense>
  )
}
