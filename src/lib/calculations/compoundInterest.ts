export interface CompoundInterestInputs {
  initialAmount: number
  monthlyContribution: number
  annualReturn: number
  years: number
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually'
  includeInflation: boolean
  inflationRate: number
}

export interface YearlyBreakdown {
  year: number
  age?: number
  totalContributed: number
  nominalValue: number
  realValue: number
  nominalInterest: number
  realInterest: number
}

export interface CompoundInterestResult {
  // Final values
  totalContributed: number
  finalNominalValue: number
  finalRealValue: number
  totalNominalInterest: number
  totalRealInterest: number

  // Purchasing power
  purchasingPowerLoss: number
  inflationAdjustedReturn: number

  // Breakdown
  yearlyBreakdown: YearlyBreakdown[]
}

export function calculateCompoundInterest(
  inputs: CompoundInterestInputs
): CompoundInterestResult {
  const {
    initialAmount,
    monthlyContribution,
    annualReturn,
    years,
    compoundingFrequency,
    includeInflation,
    inflationRate,
  } = inputs

  // Convert annual rate to rate per compounding period
  const periodsPerYear =
    compoundingFrequency === 'monthly' ? 12 :
    compoundingFrequency === 'quarterly' ? 4 : 1

  const ratePerPeriod = annualReturn / 100 / periodsPerYear
  const inflationRateDecimal = inflationRate / 100
  const totalPeriods = years * periodsPerYear

  // For monthly contributions, we need to adjust based on compounding frequency
  const contributionPerPeriod =
    compoundingFrequency === 'monthly' ? monthlyContribution :
    compoundingFrequency === 'quarterly' ? monthlyContribution * 3 :
    monthlyContribution * 12

  const yearlyBreakdown: YearlyBreakdown[] = []

  let nominalValue = initialAmount
  let totalContributed = initialAmount

  // Calculate for each period
  for (let period = 1; period <= totalPeriods; period++) {
    // Add interest
    nominalValue = nominalValue * (1 + ratePerPeriod)

    // Add contribution
    nominalValue += contributionPerPeriod
    totalContributed += contributionPerPeriod

    // Record yearly breakdown
    if (period % periodsPerYear === 0) {
      const year = period / periodsPerYear

      // Calculate real value (inflation-adjusted)
      const realValue = includeInflation
        ? nominalValue / Math.pow(1 + inflationRateDecimal, year)
        : nominalValue

      const nominalInterest = nominalValue - totalContributed
      const realInterest = realValue - totalContributed

      yearlyBreakdown.push({
        year,
        totalContributed: Math.round(totalContributed),
        nominalValue: Math.round(nominalValue),
        realValue: Math.round(realValue),
        nominalInterest: Math.round(nominalInterest),
        realInterest: Math.round(realInterest),
      })
    }
  }

  const finalNominalValue = nominalValue
  const finalRealValue = includeInflation
    ? finalNominalValue / Math.pow(1 + inflationRateDecimal, years)
    : finalNominalValue

  const totalNominalInterest = finalNominalValue - totalContributed
  const totalRealInterest = finalRealValue - totalContributed

  // Calculate purchasing power loss and real return
  const purchasingPowerLoss = includeInflation
    ? ((finalNominalValue - finalRealValue) / finalNominalValue) * 100
    : 0

  // Real return rate (Fisher equation approximation)
  const inflationAdjustedReturn = includeInflation
    ? annualReturn - inflationRate
    : annualReturn

  return {
    totalContributed: Math.round(totalContributed),
    finalNominalValue: Math.round(finalNominalValue),
    finalRealValue: Math.round(finalRealValue),
    totalNominalInterest: Math.round(totalNominalInterest),
    totalRealInterest: Math.round(totalRealInterest),
    purchasingPowerLoss: Math.round(purchasingPowerLoss * 100) / 100,
    inflationAdjustedReturn: Math.round(inflationAdjustedReturn * 100) / 100,
    yearlyBreakdown,
  }
}
