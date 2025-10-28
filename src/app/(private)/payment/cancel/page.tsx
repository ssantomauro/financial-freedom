'use client'

import Link from 'next/link'
import { XCircle, ArrowLeft } from 'lucide-react'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-gray-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Payment Cancelled
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 text-center mb-8">
            No worries! Your payment was cancelled and you haven't been charged.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-gray-700 mb-4">
              You still have <strong>3 free calculations</strong> available on each calculator. When you're ready, you can upgrade to lifetime access for:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Unlimited calculations on all calculators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Access to your calculation history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>All future features and calculators</span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl text-center"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/calculators/buy-vs-rent"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition text-center"
            >
              Try a Calculator
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Changed your mind?
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
