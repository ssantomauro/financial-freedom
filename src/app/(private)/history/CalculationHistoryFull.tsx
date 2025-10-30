'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, ChevronRight, Calculator, ArrowLeft, Filter, Home, TrendingUp, Target, PiggyBank, Baby } from 'lucide-react'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

interface Calculation {
  id: string
  calculatorType: string
  inputData: any
  resultData: any
  createdAt: string
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
  'buy-vs-rent': 'bg-blue-500 text-white',
  'compound-interest': 'bg-green-500 text-white',
  'retirement': 'bg-purple-500 text-white',
  'savings': 'bg-orange-500 text-white',
  'children-savings': 'bg-pink-500 text-white',
  'mortgage': 'bg-indigo-500 text-white',
}

const CALCULATOR_ICONS: { [key: string]: any } = {
  'buy-vs-rent': Home,
  'compound-interest': TrendingUp,
  'retirement': Target,
  'savings': PiggyBank,
  'children-savings': Baby,
  'mortgage': Calculator,
}

export function CalculationHistoryFull() {
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [allCalculations, setAllCalculations] = useState<Calculation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string | null>(null)
  const { trackEvent } = usePostHog()

  useEffect(() => {
    // Track history page view
    trackEvent(AnalyticsEvents.HISTORY_PAGE_VIEWED, {
      filter: filterType || 'all'
    })
  }, [filterType, trackEvent])

  useEffect(() => {
    fetchHistory()
  }, [filterType])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const url = filterType
        ? `/api/calculations/history?calculatorType=${filterType}`
        : '/api/calculations/history'

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setCalculations(data.calculations)

        // Store all calculations for filter options (only on first load)
        if (!filterType && allCalculations.length === 0) {
          setAllCalculations(data.calculations)
        }
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

  // Calculate unique types from all calculations to keep filter visible
  const uniqueCalculatorTypes = Array.from(
    new Set((allCalculations.length > 0 ? allCalculations : calculations).map(calc => calc.calculatorType))
  )

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calculation History
          </h1>
          <p className="text-xl text-gray-600">
            View and access all your past calculations
          </p>
        </div>

        {/* Filter Section */}
        {uniqueCalculatorTypes.length > 1 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by calculator:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType(null)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {uniqueCalculatorTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filterType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {CALCULATOR_NAMES[type] || type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && calculations.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No calculations found
            </h3>
            <p className="text-gray-600 mb-6">
              {filterType
                ? `You haven't used the ${CALCULATOR_NAMES[filterType]} yet.`
                : 'Start using a calculator to see your history here!'}
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Calculations List */}
        {!loading && !error && calculations.length > 0 && (
          <div className="space-y-3">
            <div className="mb-4 text-sm text-gray-600">
              Showing {calculations.length} calculation{calculations.length !== 1 ? 's' : ''}
            </div>
            {calculations.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.calculatorType}?calculation=${calc.id}`}
                onClick={() => {
                  trackEvent(AnalyticsEvents.PAST_CALCULATION_OPENED, {
                    calculator: calc.calculatorType,
                    calculation_id: calc.id,
                  })
                }}
                className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-md transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      CALCULATOR_COLORS[calc.calculatorType] || 'bg-gray-100 text-gray-600'
                    }`}>
                      {(() => {
                        const IconComponent = CALCULATOR_ICONS[calc.calculatorType] || Calculator
                        return <IconComponent className="w-6 h-6" />
                      })()}
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
        )}
      </div>
    </div>
  )
}
