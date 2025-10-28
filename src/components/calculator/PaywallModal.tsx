'use client'

import { useState } from 'react'
import { Lock, Check, X, Loader2 } from 'lucide-react'

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
  calculatorName: string
}

export function PaywallModal({ isOpen, onClose, calculatorName }: PaywallModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleGetLifetimeAccess = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        setError(data.error || 'Failed to create checkout session')
        setLoading(false)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Unlock Unlimited Access
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 text-center mb-8">
            You've used your free calculation for the <strong>{calculatorName}</strong>.
            Get lifetime access to all calculators with unlimited usage!
          </p>

          {/* Features */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Lifetime Access Includes:
            </h3>
            <ul className="space-y-3">
              {[
                'Unlimited calculations on all calculators',
                'Save and view your calculation history',
                'Access to all future calculators',
                'Priority email support',
                'No recurring fees - pay once, use forever',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl">
              <div className="text-sm font-medium mb-1">One-time payment</div>
              <div className="text-4xl font-bold">$49</div>
              <div className="text-sm mt-1 opacity-90">Lifetime access</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGetLifetimeAccess}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Redirecting to checkout...</span>
                </>
              ) : (
                'Get Lifetime Access Now'
              )}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>🔒 Secure payment • 💯 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  )
}
