'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, ChevronRight, Calculator } from 'lucide-react'

interface Calculation {
  id: string
  calculatorType: string
  inputData: any
  resultData: any
  createdAt: string
}

interface CalculationHistoryProps {
  hasLifetimeAccess: boolean
}

const CALCULATOR_NAMES: { [key: string]: string } = {
  'buy-vs-rent': 'Buy vs Rent Calculator',
  'compound-interest': 'Compound Interest Calculator',
  'retirement': 'Retirement Calculator',
  'savings': 'Savings Goal Calculator',
  'children-savings': 'Children Savings Calculator',
  'mortgage': 'Mortgage Calculator',
}

const CALCULATOR_COLORS: { [key: string]: string } = {
  'buy-vs-rent': 'bg-blue-100 text-blue-600',
  'compound-interest': 'bg-green-100 text-green-600',
  'retirement': 'bg-purple-100 text-purple-600',
  'savings': 'bg-orange-100 text-orange-600',
  'children-savings': 'bg-pink-100 text-pink-600',
  'mortgage': 'bg-indigo-100 text-indigo-600',
}

export function CalculationHistory({ hasLifetimeAccess }: CalculationHistoryProps) {
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (hasLifetimeAccess) {
      fetchHistory()
    } else {
      setLoading(false)
    }
  }, [hasLifetimeAccess])

  const fetchHistory = async () => {
    try {
      // Fetch only last 3 calculations for dashboard
      const response = await fetch('/api/calculations/history?limit=3')
      if (response.ok) {
        const data = await response.json()
        setCalculations(data.calculations)
      } else {
        const error = await response.json()
        setError(error.error || 'Failed to load history')
      }
    } catch (err) {
      console.error('Failed to fetch calculation history:', err)
      setError('Failed to load calculation history')
    } finally {
      setLoading(false)
    }
  }

  if (!hasLifetimeAccess) {
    return (
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Calculation History
          </h3>
          <p className="text-gray-600 mb-6">
            Upgrade to lifetime access to view and access your past calculations
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Upgrade to Lifetime Access
          </button>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Calculations</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Calculations</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      </section>
    )
  }

  if (calculations.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Calculations</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No calculations yet. Start using a calculator to see your history here!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Calculations</h2>
      <div className="space-y-3">
        {calculations.map((calc) => (
          <Link
            key={calc.id}
            href={`/calculators/${calc.calculatorType}?calculation=${calc.id}`}
            className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  CALCULATOR_COLORS[calc.calculatorType] || 'bg-gray-100 text-gray-600'
                }`}>
                  <Calculator className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {CALCULATOR_NAMES[calc.calculatorType] || calc.calculatorType}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(calc.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
            </div>
          </Link>
        ))}
      </div>

      {/* View All History Link */}
      <div className="mt-4 text-center">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
        >
          View All History
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
