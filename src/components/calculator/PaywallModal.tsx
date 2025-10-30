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
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] shadow-2xl relative overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Unlock Unlimited Access
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 text-center mb-6">
            You've used your free calculation for the <strong>{calculatorName}</strong>.
            Get lifetime access to all calculators with unlimited usage!
          </p>

          {/* Features */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center">
              Lifetime Access Includes:
            </h3>
            <ul className="space-y-2">
              {[
                'Unlimited calculations on all calculators',
                'Save and view your calculation history',
                'Access to all future calculators',
                'Priority email support',
                'No recurring fees - pay once, use forever',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl">
              <div className="text-xs font-medium mb-1">One-time payment</div>
              <div className="flex items-center justify-center gap-2">
                <div className="text-xl font-bold line-through opacity-60">$29.90</div>
                <div className="text-3xl font-bold">$9.90</div>
              </div>
              <div className="text-xs mt-1.5 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full inline-block font-semibold">
                First 100 users only!
              </div>
              <div className="text-xs mt-1.5 opacity-90">Lifetime access</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 bg-red-50 border border-red-200 rounded-lg p-2 text-red-600 text-xs">
              {error}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleGetLifetimeAccess}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 transition shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Redirecting to checkout...</span>
                </>
              ) : (
                'Get Lifetime Access Now'
              )}
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>🔒 Secure payment • 💯 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  )
}
