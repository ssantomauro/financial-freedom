import { Suspense } from 'react'
import { SuccessPageContent } from './SuccessPageContent'

export const dynamic = 'force-dynamic'

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  )
}
