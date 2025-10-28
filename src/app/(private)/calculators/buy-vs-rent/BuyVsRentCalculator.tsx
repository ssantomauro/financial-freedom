'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Home, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { BuyVsRentForm, BuyVsRentInputs } from '@/components/calculator/BuyVsRentForm'
import { PaywallModal } from '@/components/calculator/PaywallModal'

interface UsageStatus {
  canUse: boolean
  hasLifetimeAccess: boolean
  calculationsUsed: number
  remainingCalculations: number // -1 means unlimited
}

interface CalculationResult {
  buyingTotalCost: number
  rentingTotalCost: number
  buyingMonthlyPayment: number
  rentingTotalPayment: number
  homeValueAfterYears: number
  investmentValueIfRenting: number
  recommendation: 'buy' | 'rent'
  savings: number
  breakEvenYear: number | null
}

export function BuyVsRentCalculator() {
  const searchParams = useSearchParams()
  const calculationId = searchParams.get('calculation')

  const [usageStatus, setUsageStatus] = useState<UsageStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPaywall, setShowPaywall] = useState(false)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [calculating, setCalculating] = useState(false)
  const [initialInputs, setInitialInputs] = useState<BuyVsRentInputs | null>(null)
  const [loadingCalculation, setLoadingCalculation] = useState(false)

  useEffect(() => {
    checkUsageStatus()

    // Load past calculation if ID is provided
    if (calculationId) {
      loadCalculation(calculationId)
    }
  }, [calculationId])

  const checkUsageStatus = async (): Promise<UsageStatus | null> => {
    try {
      const response = await fetch('/api/calculations/usage-status?calculatorType=buy-vs-rent')
      const data = await response.json()
      setUsageStatus(data)
      return data
    } catch (error) {
      console.error('Failed to check usage status:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const loadCalculation = async (id: string) => {
    setLoadingCalculation(true)
    try {
      const response = await fetch(`/api/calculations/${id}`)
      if (response.ok) {
        const data = await response.json()
        const calc = data.calculation

        // Set initial inputs from saved calculation
        setInitialInputs(calc.inputData as BuyVsRentInputs)

        // If there's result data, show it
        if (calc.resultData) {
          setResult(calc.resultData as CalculationResult)
        }
      } else {
        console.error('Failed to load calculation')
      }
    } catch (error) {
      console.error('Error loading calculation:', error)
    } finally {
      setLoadingCalculation(false)
    }
  }

  const calculateResults = (inputs: BuyVsRentInputs): CalculationResult => {
    const {
      homePrice,
      downPayment,
      interestRate,
      loanTerm,
      propertyTax,
      homeInsurance,
      hoaFees,
      maintenance,
      monthlyRent,
      rentersInsurance,
      homeAppreciation,
      rentIncrease,
      investmentReturn,
      yearsToCompare,
    } = inputs

    // Calculate mortgage payment
    const loanAmount = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    const mortgagePayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    // Calculate buying costs
    const buyingMonthlyTotal = mortgagePayment + propertyTax + homeInsurance + hoaFees + maintenance
    const buyingTotalPaid = buyingMonthlyTotal * 12 * yearsToCompare + downPayment

    // Calculate home appreciation
    const homeValueAfterYears = homePrice * Math.pow(1 + homeAppreciation / 100, yearsToCompare)
    const equityBuilt = homeValueAfterYears - loanAmount // Simplified

    // Calculate renting costs
    let rentingTotalPaid = 0
    let currentRent = monthlyRent
    for (let year = 0; year < yearsToCompare; year++) {
      rentingTotalPaid += (currentRent + rentersInsurance) * 12
      currentRent *= 1 + rentIncrease / 100
    }

    // Calculate investment value if renting (down payment invested)
    const investmentValueIfRenting =
      downPayment * Math.pow(1 + investmentReturn / 100, yearsToCompare)

    // Net positions
    const buyingNetPosition = homeValueAfterYears - buyingTotalPaid
    const rentingNetPosition = investmentValueIfRenting - rentingTotalPaid

    // Determine recommendation
    const savings = Math.abs(buyingNetPosition - rentingNetPosition)
    const recommendation = buyingNetPosition > rentingNetPosition ? 'buy' : 'rent'

    // Calculate break-even year (simplified)
    let breakEvenYear = null
    for (let year = 1; year <= yearsToCompare; year++) {
      const buyValue = homePrice * Math.pow(1 + homeAppreciation / 100, year)
      const buyCost = buyingMonthlyTotal * 12 * year + downPayment
      const buyNet = buyValue - buyCost

      let rentCost = 0
      let rent = monthlyRent
      for (let y = 0; y < year; y++) {
        rentCost += (rent + rentersInsurance) * 12
        rent *= 1 + rentIncrease / 100
      }
      const investValue = downPayment * Math.pow(1 + investmentReturn / 100, year)
      const rentNet = investValue - rentCost

      if (buyNet >= rentNet && !breakEvenYear) {
        breakEvenYear = year
        break
      }
    }

    return {
      buyingTotalCost: buyingTotalPaid,
      rentingTotalCost: rentingTotalPaid,
      buyingMonthlyPayment: buyingMonthlyTotal,
      rentingTotalPayment: rentingTotalPaid,
      homeValueAfterYears,
      investmentValueIfRenting,
      recommendation,
      savings,
      breakEvenYear,
    }
  }

  const handleSubmit = async (inputs: BuyVsRentInputs) => {
    // Check if user can use the calculator
    if (!usageStatus?.canUse) {
      setShowPaywall(true)
      return
    }

    setCalculating(true)

    try {
      // Calculate results
      const calculationResult = calculateResults(inputs)
      setResult(calculationResult)

      // Save to database
      await fetch('/api/calculations/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType: 'buy-vs-rent',
          inputData: inputs,
          resultData: calculationResult,
        }),
      })

      // Update usage status
      const updatedStatus = await checkUsageStatus()

      // Show paywall after 3rd calculation (when remaining becomes 0)
      if (!usageStatus.hasLifetimeAccess && updatedStatus && updatedStatus.remainingCalculations === 0) {
        setTimeout(() => {
          setShowPaywall(true)
        }, 2000) // Show paywall 2 seconds after seeing results
      }
    } catch (error) {
      console.error('Calculation error:', error)
      alert('Failed to save calculation. Please try again.')
    } finally {
      setCalculating(false)
    }
  }

  if (loading) {
    return (
      <div className="py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  const isFormDisabled = usageStatus ? !usageStatus.canUse : false

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Buy vs Rent Calculator
            </h1>
            <p className="text-xl text-gray-600">
              Compare the true costs of buying vs renting to make the right decision for your situation
            </p>
          </div>
        </div>

        {/* Usage Status Banner */}
        {usageStatus && !usageStatus.hasLifetimeAccess && usageStatus.remainingCalculations === 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-yellow-800 font-medium">
                You've used all {usageStatus.calculationsUsed} free calculations. Upgrade to lifetime access for unlimited calculations!
              </p>
              <button
                onClick={() => setShowPaywall(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition whitespace-nowrap"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Calculator Form */}
        <div className="mb-8">
          {loadingCalculation ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading calculation...</p>
            </div>
          ) : (
            <BuyVsRentForm
              onSubmit={handleSubmit}
              isDisabled={isFormDisabled}
              initialValues={initialInputs}
            />
          )}

          {/* Remaining Calculations Info */}
          {usageStatus && !usageStatus.hasLifetimeAccess && usageStatus.remainingCalculations > 0 && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {usageStatus.remainingCalculations === 3 ? (
                  <>You have <strong className="text-blue-600">{usageStatus.remainingCalculations} free calculations</strong> remaining</>
                ) : usageStatus.remainingCalculations === 1 ? (
                  <>This is your <strong className="text-orange-600">last free calculation</strong></>
                ) : (
                  <>You have <strong className="text-orange-600">{usageStatus.remainingCalculations} free calculations</strong> remaining</>
                )}
              </p>
            </div>
          )}

          {usageStatus && usageStatus.hasLifetimeAccess && (
            <div className="text-center mt-4">
              <p className="text-sm text-green-600 font-medium">
                ✓ You have unlimited calculations
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Your Results
            </h2>

            {/* Recommendation */}
            <div className={`mb-8 p-6 rounded-xl ${
              result.recommendation === 'buy'
                ? 'bg-green-100 border border-green-300'
                : 'bg-blue-100 border border-blue-300'
            }`}>
              <div className="flex items-center justify-center gap-3 mb-3">
                {result.recommendation === 'buy' ? (
                  <TrendingUp className="w-8 h-8 text-green-600" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-blue-600" />
                )}
                <h3 className="text-2xl font-bold text-gray-900">
                  Recommendation: {result.recommendation === 'buy' ? 'Buy' : 'Rent'}
                </h3>
              </div>
              <p className="text-center text-gray-700 text-lg">
                {result.recommendation === 'buy'
                  ? `Buying could save you ${result.savings.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    })} over the time period.`
                  : `Renting could save you ${result.savings.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    })} over the time period.`}
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Buying */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Buying</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold">
                      {result.buyingMonthlyPayment.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-semibold">
                      {result.buyingTotalCost.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Home Value:</span>
                    <span className="font-semibold text-green-600">
                      {result.homeValueAfterYears.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Renting */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Renting</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Rent Paid:</span>
                    <span className="font-semibold">
                      {result.rentingTotalCost.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Value:</span>
                    <span className="font-semibold text-green-600">
                      {result.investmentValueIfRenting.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Break-even */}
            {result.breakEvenYear && (
              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  <span className="font-semibold">Break-even point:</span> Year {result.breakEvenYear}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Paywall Modal */}
        <PaywallModal
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          calculatorName="Buy vs Rent Calculator"
        />
      </div>
    </div>
  )
}
