'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react'

export function SuccessPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Redirect to dashboard after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Navigate when countdown reaches 0
    if (countdown === 0) {
      router.push('/dashboard')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Welcome to Lifetime Access!
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 text-center mb-8">
            Your payment was successful. You now have unlimited access to all calculators!
          </p>

          {/* Features Unlocked */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                You now have access to:
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                'Unlimited calculations on all calculators',
                'Full calculation history access',
                'Priority email support',
                'All future calculators and features',
                'No recurring fees - yours forever!',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Receipt Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
            <p className="text-sm text-gray-600">
              A receipt has been sent to your email address.
              {sessionId && (
                <>
                  <br />
                  <span className="text-xs text-gray-500">
                    Session ID: {sessionId.slice(0, 20)}...
                  </span>
                </>
              )}
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/history"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition text-center"
            >
              View Calculation History
            </Link>
          </div>

          {/* Auto-redirect notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Auto-redirecting to dashboard in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Need help? Have questions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Contact Support
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
