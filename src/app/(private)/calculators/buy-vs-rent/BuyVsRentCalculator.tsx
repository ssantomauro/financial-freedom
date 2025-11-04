'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Home, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { BuyVsRentForm, BuyVsRentInputs } from '@/components/calculator/BuyVsRentForm'
import { PaywallModal } from '@/components/calculator/PaywallModal'
import { MathExplanationModal } from '@/components/calculator/MathExplanationModal'
import {LabelWithTooltip} from "@/components/ui/LabelWithTooltip";
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

interface UsageStatus {
  canUse: boolean
  hasLifetimeAccess: boolean
  calculationsUsed: number
  remainingCalculations: number // -1 means unlimited
}

interface CalculationResult {
  buyingTotalCost: number
  buyingNetWorth: number
  rentingTotalCost: number
  rentingNetWorth: number
  buyingMonthlyPayment: number
  buyingMonthlyLoan: number
  monthlyRent: number
  averageRentPaid: number
  homeValueAfterYears: number
  investmentValueIfRenting: number
  recommendation: 'buy' | 'rent'
  savings: number
}

export function BuyVsRentCalculator() {
  const searchParams = useSearchParams()
  const calculationId = searchParams.get('calculation')
  const { trackEvent } = usePostHog()

  const [usageStatus, setUsageStatus] = useState<UsageStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPaywall, setShowPaywall] = useState(false)
  const [showMathExplanation, setShowMathExplanation] = useState(false)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [calculating, setCalculating] = useState(false)
  const [initialInputs, setInitialInputs] = useState<BuyVsRentInputs | null>(null)
  const [loadingCalculation, setLoadingCalculation] = useState(false)

  useEffect(() => {
    // Track calculator opened
    trackEvent(AnalyticsEvents.CALCULATOR_OPENED, {
      calculator: 'buy-vs-rent',
      from_history: !!calculationId
    })

    checkUsageStatus()

    // Load past calculation if ID is provided
    if (calculationId) {
      loadCalculation(calculationId)
    }
  }, [calculationId, trackEvent])

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
      closingCostsBuying,
      closingCostsSelling,
      propertyTax,
      pmiRate,
      homeInsurance,
      hoaFees,
      maintenanceRate,
      monthlyRent,
      rentersInsurance,
      homeAppreciation,
      rentIncrease,
      investmentReturn
    } = inputs

    // Stefano's calculation
    const closingCostsPercent = closingCostsBuying / 100 || 0;
    const closingCostsSellingPercent = closingCostsSelling / 100 || 0;
    const mortgageRate = interestRate / 100 || 0;
    const propertyTaxRate = propertyTax / 100 || 0;
    const pmiRatePerc = pmiRate / 100 || 0;
    const maintenancePercent = maintenanceRate / 100 || 0;
    const appreciationRate = homeAppreciation / 100 || 0;
    const assessedRate = 0.02;

    const rentIncreaseRate = rentIncrease / 100 || 0;
    const securityDeposit = monthlyRent || 0;
    const investmentReturnRate = investmentReturn / 100 || 0;
    const years = loanTerm || 10;

    // Calculate buying costs
    const downPaymentAmount = homePrice * (downPayment / 100);
    const closingCosts = homePrice * closingCostsPercent;
    let loanAmount = homePrice - downPaymentAmount;
    const monthlyRate = mortgageRate / 12;
    const numPayments = years * 12; // x-year mortgage
    const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const yearlyMortgage = monthlyMortgage * 12;
    const totalMortgage = yearlyMortgage * years;
    const costPMI = loanAmount * pmiRatePerc;

    // Check if we want to add
    // document.getElementById('monthlyCost').value = parseInt(monthlyMortgage + ((downPayment < 20) ? costPMI/12 : 0) + (homePrice * propertyTaxRate/12) + (homeInsurance/12) + hoaFees + (homePrice * maintenancePercent/12));

    let totalBuyingCosts = downPaymentAmount + closingCosts; // Include closing costs in initial investment
    let realTotalBuyingCosts = 0;
    let totalRentingCosts = securityDeposit;
    let remainingLoanBalance = loanAmount;

    let totalPaidMortgage = 0;
    let marketHomeValue = homePrice;
    let assessedHomeValue = homePrice;
    let totalStockBalance = downPaymentAmount + closingCosts; // Invest entire home price in stocks

    let lastYearlyRent = monthlyRent * 12;

    let netWealth = 0;
    let rentWealth = 0;

    for (let year = 1; year <= years; year++) {
      // Buying calculations
      totalPaidMortgage += yearlyMortgage;
      const yearlyPropertyTax = assessedHomeValue * propertyTaxRate;
      const yearlyMaintenance = marketHomeValue * maintenancePercent;

      const yearlyBuyingCosts = yearlyMortgage + yearlyPropertyTax + homeInsurance + yearlyMaintenance + (hoaFees * 12);
      totalBuyingCosts += yearlyBuyingCosts;

      marketHomeValue *= (1 + appreciationRate);
      assessedHomeValue *= (1 + assessedRate);

      const homeEquity = marketHomeValue - (totalMortgage - totalPaidMortgage);

      // Investment growth (monthly contributions equal to mortgage payment difference)
      const yearlyInvestmentContribution = yearlyBuyingCosts - lastYearlyRent;

      // Stock-only investment (compound growth of entire home price)
      totalStockBalance = (year > 1) ? (totalStockBalance + yearlyInvestmentContribution) * (1 + investmentReturnRate) : totalStockBalance * (1 + investmentReturnRate);

      // Renting calculations
      if (year > 1)
        lastYearlyRent = lastYearlyRent * (1 + rentIncreaseRate);
      totalRentingCosts += lastYearlyRent;

      realTotalBuyingCosts = totalBuyingCosts + ((downPayment < 20 && totalPaidMortgage < totalMortgage * 0.8) ? costPMI : 0);
      netWealth = homeEquity + downPayment - realTotalBuyingCosts;
      rentWealth = totalStockBalance - totalRentingCosts;
    }

    const buyingMonthlyTotal = realTotalBuyingCosts / loanTerm / 12;
    const averageRentPaid = totalRentingCosts / loanTerm / 12;
    const buyingNetWorth = marketHomeValue - realTotalBuyingCosts - (marketHomeValue * closingCostsSellingPercent);
    const rentingNetWorth = totalStockBalance - totalRentingCosts;

    return {
      buyingTotalCost: realTotalBuyingCosts,
      buyingNetWorth: buyingNetWorth,
      rentingTotalCost: totalRentingCosts,
      rentingNetWorth: rentingNetWorth,
      buyingMonthlyLoan: monthlyMortgage,
      buyingMonthlyPayment: buyingMonthlyTotal,
      homeValueAfterYears: marketHomeValue,
      investmentValueIfRenting: totalStockBalance,
      recommendation: buyingNetWorth > rentingNetWorth ? 'buy' : 'rent',
      savings: Math.abs(buyingNetWorth - rentingNetWorth),
      monthlyRent: monthlyRent,
      averageRentPaid: averageRentPaid,
    }
  }

  const handleSubmit = async (inputs: BuyVsRentInputs) => {
    // Track calculation started
    trackEvent(AnalyticsEvents.CALCULATOR_STARTED, {
      calculator: 'buy-vs-rent',
      has_lifetime_access: usageStatus?.hasLifetimeAccess,
      calculations_remaining: usageStatus?.remainingCalculations
    })

    // Check if user can use the calculator
    if (!usageStatus?.canUse) {
      trackEvent(AnalyticsEvents.PAYWALL_SHOWN, {
        calculator: 'buy-vs-rent',
        trigger: 'no_calculations_remaining'
      })
      setShowPaywall(true)
      return
    }

    setCalculating(true)

    try {
      // Calculate results
      const calculationResult = calculateResults(inputs)
      setResult(calculationResult)

      // Track calculation completed
      trackEvent(AnalyticsEvents.CALCULATION_COMPLETED, {
        calculator: 'buy-vs-rent',
        recommendation: calculationResult.recommendation,
        savings: calculationResult.savings,
        has_lifetime_access: usageStatus?.hasLifetimeAccess
      })

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

      trackEvent(AnalyticsEvents.CALCULATION_SAVED, {
        calculator: 'buy-vs-rent'
      })

      // Update usage status
      const updatedStatus = await checkUsageStatus()

      // Show paywall after 3rd calculation (when remaining becomes 0)
      if (!usageStatus.hasLifetimeAccess && updatedStatus && updatedStatus.remainingCalculations === 0) {
        setTimeout(() => {
          trackEvent(AnalyticsEvents.PAYWALL_SHOWN, {
            calculator: 'buy-vs-rent',
            trigger: 'after_last_free_calculation'
          })
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
        <div className="max-w-7xl mx-auto text-center">
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
      <div className="max-w-7xl mx-auto">
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

        {/* Disclaimer */}
        <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>DISCLAIMER:</strong> This calculator is designed to provide general information, not financial advice.
            Before making any financial decisions, please consult a qualified professional.
          </p>
        </div>

        {/* Usage Status Banner */}
        {usageStatus && !usageStatus.hasLifetimeAccess && usageStatus.remainingCalculations === 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-yellow-800 font-medium">
                You've used all 3 free calculations. Upgrade to lifetime access for unlimited calculations!
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
                <span>
                  {result.recommendation === 'buy' ? `Buying` : `Renting`} puts an extra
                  <strong> {result.savings.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })}</strong> in your pocket over the time period examined (Loan Term years).</span>
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Buying */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Buying</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label="Total Paid:"
                        tooltip="This is the total amount you will pay to have that house over the loan term. It is calculated by summing up monthly loan, closing costs, HOA fees, and so on"
                    />
                    <span className="font-semibold">
                      {result.buyingTotalCost.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Loan:</span>
                    <span className="font-semibold">
                      {result.buyingMonthlyLoan.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label={`Average Monthly Payment:`}
                        tooltip="This is the average monthly payment that you will actually pay to have that house over the loan term. It is calculated by dividing the 'Total Paid' by the number of months"
                    />
                    <span className="font-semibold">
                      {result.buyingMonthlyPayment.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label="Home Market Value:"
                        tooltip="The estimated market value of the house after the loan term"
                    />
                    <span className="font-semibold">
                      {result.homeValueAfterYears.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label="Net Worth:"
                        tooltip="The estimated market value of the house after the loan term"
                    />
                    <span className="font-semibold text-green-600">
                      {result.buyingNetWorth.toLocaleString('en-US', {
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
                    <LabelWithTooltip
                        className="text-gray-600"
                        label={`Total Rent Paid:`}
                        tooltip="Total amount paid to rent the house over the loan term. This is the sum of the monthly rent and the security deposit, also considering the 'Rent Increase Rate'"
                    />
                    <span className="font-semibold">
                      {result.rentingTotalCost.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label={`Monthly Rent:`}
                        tooltip="The initial rent"
                    />
                    <span className="font-semibold">
                      {result.monthlyRent.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label={`Average Rent Paid:`}
                        tooltip="This is the average rent payment that you will actually pay to rent the house over the loan term. It is calculated by dividing the 'Total Rent Paid' by the number of months"
                    />
                    <span className="font-semibold">
                      {result.averageRentPaid.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label={`Investment Value:`}
                        tooltip="This is the money you will have after the loan term investing the amount saved every month if you won't buy"
                    />
                    <span className="font-semibold">
                      {result.investmentValueIfRenting.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <LabelWithTooltip
                        className="text-gray-600"
                        label={`Net Worth:`}
                        tooltip="This is the money you will have after the loan term investing the amount saved every month if you won't buy"
                    />
                    <span className="font-semibold text-green-600">
                      {result.rentingNetWorth.toLocaleString('en-US', {
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
            {/*{result.breakEvenYear && (*/}
            {/*  <div className="mt-6 text-center">*/}
            {/*    <p className="text-gray-700">*/}
            {/*      <span className="font-semibold">Break-even point:</span> Year {result.breakEvenYear}*/}
            {/*    </p>*/}
            {/*  </div>*/}
            {/*)}*/}

            {/* Learn More Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  trackEvent(AnalyticsEvents.MATH_MODAL_OPENED, {
                    calculator: 'buy-vs-rent'
                  })
                  setShowMathExplanation(true)
                }}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
              >
                Do you want to know more about the math behind? Click here
              </button>
            </div>
          </div>
        )}

        {/* Paywall Modal */}
        <PaywallModal
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          calculatorName="Buy vs Rent Calculator"
        />

        {/* Math Explanation Modal */}
        <MathExplanationModal
          isOpen={showMathExplanation}
          onClose={() => setShowMathExplanation(false)}
        />
      </div>
    </div>
  )
}
