'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CompoundInterestForm, CompoundInterestInputs } from '@/components/calculator/CompoundInterestForm'
import { calculateCompoundInterest, CompoundInterestResult } from '@/lib/calculations/compoundInterest'
import { PaywallModal } from '@/components/calculator/PaywallModal'
import { TrendingUp, DollarSign, Percent, ArrowLeft } from 'lucide-react'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

interface UsageStatus {
  remainingCalculations: number
  hasLifetimeAccess: boolean
}

interface CompoundInterestCalculatorProps {
  calculationId?: string | null
}

export function CompoundInterestCalculator({ calculationId }: CompoundInterestCalculatorProps) {
  const [inputs, setInputs] = useState<CompoundInterestInputs | null>(null)
  const [result, setResult] = useState<CompoundInterestResult | null>(null)
  const [usageStatus, setUsageStatus] = useState<UsageStatus | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [initialValues, setInitialValues] = useState<CompoundInterestInputs | null>(null)
  const { trackEvent } = usePostHog()

  // Track calculator opened
  useEffect(() => {
    trackEvent(AnalyticsEvents.CALCULATOR_OPENED, {
      calculator: 'compound-interest',
      from_history: !!calculationId
    })

    // Fetch usage status and past calculation if needed
    const fetchData = async () => {
      try {
        // Fetch usage status
        const statusRes = await fetch('/api/calculations/usage-status')
        if (statusRes.ok) {
          const statusData = await statusRes.json()
          setUsageStatus(statusData)
        }

        // Fetch past calculation if ID provided
        if (calculationId) {
          const calcRes = await fetch(`/api/calculations/${calculationId}`)
          if (calcRes.ok) {
            const calcData = await calcRes.json()
            if (calcData.calculatorType === 'compound-interest') {
              setInitialValues(calcData.inputData)
              setInputs(calcData.inputData)
              setResult(calcData.resultData)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [calculationId, trackEvent])

  const handleCalculate = async (calculatorInputs: CompoundInterestInputs) => {
    setIsLoading(true)

    trackEvent(AnalyticsEvents.CALCULATOR_STARTED, {
      calculator: 'compound-interest',
      has_lifetime_access: usageStatus?.hasLifetimeAccess,
      calculations_remaining: usageStatus?.remainingCalculations,
      include_inflation: calculatorInputs.includeInflation
    })

    try {
      // Check usage limits
      if (!usageStatus?.hasLifetimeAccess && usageStatus?.remainingCalculations === 0) {
        setShowPaywall(true)
        trackEvent(AnalyticsEvents.PAYWALL_SHOWN, {
          calculator: 'compound-interest',
          trigger: 'no_calculations_remaining'
        })
        setIsLoading(false)
        return
      }

      // Perform calculation
      const calculationResult = calculateCompoundInterest(calculatorInputs)

      setInputs(calculatorInputs)
      setResult(calculationResult)

      // Save to database
      const saveRes = await fetch('/api/calculations/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType: 'compound-interest',
          inputData: calculatorInputs,
          resultData: calculationResult,
        }),
      })

      if (saveRes.ok) {
        trackEvent(AnalyticsEvents.CALCULATION_COMPLETED, {
          calculator: 'compound-interest',
          final_value: calculationResult.finalNominalValue,
          total_interest: calculationResult.totalNominalInterest,
          include_inflation: calculatorInputs.includeInflation,
          has_lifetime_access: usageStatus?.hasLifetimeAccess
        })

        trackEvent(AnalyticsEvents.CALCULATION_SAVED, {
          calculator: 'compound-interest'
        })

        // Update usage status
        const statusRes = await fetch('/api/calculations/usage-status')
        if (statusRes.ok) {
          const newStatus = await statusRes.json()
          setUsageStatus(newStatus)

          // Show paywall if last free calculation
          if (!newStatus.hasLifetimeAccess && newStatus.remainingCalculations === 0) {
            setShowPaywall(true)
            trackEvent(AnalyticsEvents.PAYWALL_SHOWN, {
              calculator: 'compound-interest',
              trigger: 'after_last_free_calculation'
            })
          }
        }
      }
    } catch (error) {
      console.error('Calculation error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back to Dashboard Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compound Interest Calculator</h1>
              {usageStatus && !usageStatus.hasLifetimeAccess && (
                <p className="text-sm text-gray-600 mt-1">
                  {usageStatus.remainingCalculations} free {usageStatus.remainingCalculations === 1 ? 'calculation' : 'calculations'} remaining
                </p>
              )}
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            See how your money grows over time with compound interest. Toggle inflation to see real purchasing power.
          </p>

          {/* Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>DISCLAIMER:</strong> This calculator is provided for educational and informational purposes only and
              does not constitute financial advice. This is just a tool to help you make a decision.
              You should always consult with a professional before making any financial decisions.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form - Left Side */}
          <div className="lg:col-span-2">
            <CompoundInterestForm
              onSubmit={handleCalculate}
              isDisabled={isLoading}
              initialValues={initialValues}
            />
          </div>

          {/* Results - Right Side */}
          <div className="lg:col-span-3">
            {result && inputs ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5" />
                      <h3 className="text-sm font-medium opacity-90">
                        {inputs.includeInflation ? 'Nominal Value' : 'Final Value'}
                      </h3>
                    </div>
                    <p className="text-3xl font-bold">{formatCurrency(result.finalNominalValue)}</p>
                    <p className="text-sm opacity-90 mt-2">
                      Total Interest: {formatCurrency(result.totalNominalInterest)}
                    </p>
                  </div>

                  {inputs.includeInflation && (
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Percent className="w-5 h-5" />
                        <h3 className="text-sm font-medium opacity-90">Real Value (Inflation-Adjusted)</h3>
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(result.finalRealValue)}</p>
                      <p className="text-sm opacity-90 mt-2">
                        Real Interest: {formatCurrency(result.totalRealInterest)}
                      </p>
                    </div>
                  )}

                  {!inputs.includeInflation && (
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5" />
                        <h3 className="text-sm font-medium opacity-90">Total Contributed</h3>
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(result.totalContributed)}</p>
                      <p className="text-sm opacity-90 mt-2">
                        Your Investment
                      </p>
                    </div>
                  )}
                </div>

                {/* Inflation Impact */}
                {inputs.includeInflation && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-amber-900 mb-4">Inflation Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-amber-700 mb-1">Purchasing Power Loss</p>
                        <p className="text-2xl font-bold text-amber-900">{result.purchasingPowerLoss.toFixed(1)}%</p>
                        <p className="text-sm text-amber-600 mt-1">
                          {formatCurrency(result.finalNominalValue - result.finalRealValue)} lost to inflation
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-amber-700 mb-1">Real Return Rate</p>
                        <p className="text-2xl font-bold text-amber-900">{result.inflationAdjustedReturn.toFixed(1)}%</p>
                        <p className="text-sm text-amber-600 mt-1">
                          After {inputs.inflationRate}% inflation
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Year by Year Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Year-by-Year Growth</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Year</th>
                          <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Contributed</th>
                          <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">
                            {inputs.includeInflation ? 'Nominal' : 'Total Value'}
                          </th>
                          {inputs.includeInflation && (
                            <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Real Value</th>
                          )}
                          <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.map((year) => (
                          <tr key={year.year} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-2 text-sm text-gray-900">{year.year}</td>
                            <td className="py-3 px-2 text-sm text-gray-600 text-right">
                              {formatCurrency(year.totalContributed)}
                            </td>
                            <td className="py-3 px-2 text-sm font-semibold text-gray-900 text-right">
                              {formatCurrency(year.nominalValue)}
                            </td>
                            {inputs.includeInflation && (
                              <td className="py-3 px-2 text-sm font-semibold text-purple-600 text-right">
                                {formatCurrency(year.realValue)}
                              </td>
                            )}
                            <td className="py-3 px-2 text-sm text-green-600 text-right">
                              {formatCurrency(inputs.includeInflation ? year.realInterest : year.nominalInterest)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Understanding Your Results</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• <strong>Total Contributed:</strong> The sum of your initial amount plus all monthly contributions</li>
                    {inputs.includeInflation ? (
                      <>
                        <li>• <strong>Nominal Value:</strong> What your account balance will show (not adjusted for inflation)</li>
                        <li>• <strong>Real Value:</strong> What your money can actually buy in today's dollars</li>
                        <li>• <strong>Purchasing Power Loss:</strong> How much value inflation erodes from your returns</li>
                      </>
                    ) : (
                      <>
                        <li>• <strong>Final Value:</strong> Your total account balance after {inputs.years} years</li>
                        <li>• <strong>Total Interest:</strong> How much your money earned through compound growth</li>
                      </>
                    )}
                    <li>• Compounding frequency: <strong>{inputs.compoundingFrequency}</strong> (interest calculated and added this often)</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-gray-600">
                  Fill out the form and click "Calculate Growth" to see how your investment will grow over time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        calculatorName="Compound Interest Calculator"
      />
    </div>
  )
}
