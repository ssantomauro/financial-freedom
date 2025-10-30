'use client'

import { X } from 'lucide-react'

interface MathExplanationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MathExplanationModal({ isOpen, onClose }: MathExplanationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Understanding the Math
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Introduction */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              This calculator compares the financial outcomes of buying versus renting over your specified time period.
              Here's how we calculate each scenario:
            </p>
          </div>

          {/* Buying Calculations */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Buying Calculations
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">1. Monthly Mortgage Payment</h4>
                <p className="text-gray-700 mb-2">
                  We use the standard mortgage payment formula:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  M = P × [r(1 + r)^n] / [(1 + r)^n - 1]
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>• M = Monthly payment</li>
                  <li>• P = Loan amount (Home Price - Down Payment)</li>
                  <li>• r = Monthly interest rate (Annual Rate / 12)</li>
                  <li>• n = Number of payments (Years × 12)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">2. Total Monthly Costs</h4>
                <p className="text-gray-700">
                  We add all recurring monthly costs:
                </p>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>• Mortgage payment (principal + interest)</li>
                  <li>• Property taxes (annual amount / 12)</li>
                  <li>• Home insurance</li>
                  <li>• HOA fees</li>
                  <li>• Maintenance (assumed at 1% of home value annually)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Upfront Costs</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Down payment</li>
                  <li>• Closing costs (typically 2-5% of home price)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">4. Home Equity Built</h4>
                <p className="text-gray-700 mb-2">
                  Over time, you build equity through:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Paying down the principal balance</li>
                  <li>• Home appreciation (based on your specified appreciation rate)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  Final equity = (Home Value × Appreciation) - Remaining Loan Balance
                </p>
              </div>
            </div>
          </div>

          {/* Renting Calculations */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Renting Calculations
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">1. Monthly Rent Costs</h4>
                <p className="text-gray-700 mb-2">
                  Rent increases annually by your specified rate:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  Rent Year N = Initial Rent × (1 + Increase Rate)^N
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">2. Upfront Costs</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Security deposit (typically 1 month's rent)</li>
                  <li>• First month's rent</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Investment Growth</h4>
                <p className="text-gray-700 mb-2">
                  The money you save by not buying (down payment + monthly savings) is invested and grows:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  Investment = Initial Amount × (1 + Return Rate)^Years
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  We compound this monthly and add any savings from lower monthly costs.
                </p>
              </div>
            </div>
          </div>

          {/* Final Comparison */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Final Comparison
            </h3>
            <p className="text-gray-700 mb-2">
              We compare your net worth in each scenario:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Buying Net Worth:</strong> Home equity - Total costs paid
              </li>
              <li>
                <strong>Renting Net Worth:</strong> Investment portfolio value - Total rent paid
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              The recommendation is based on which scenario leaves you with greater net worth after your specified time period.
            </p>
          </div>

          {/* Important Considerations */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-amber-900 mb-2">
              Important Considerations
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>
                • This calculator focuses on financial outcomes and doesn't account for lifestyle preferences
              </li>
              <li>
                • Market conditions, interest rates, and home values can be unpredictable
              </li>
              <li>
                • Tax implications (mortgage interest deduction, capital gains) are not included
              </li>
              <li>
                • Transaction costs when selling a home (realtor fees, etc.) are not included
              </li>
              <li>
                • Results are estimates based on your inputs and assumptions
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
