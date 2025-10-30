'use client'

import { useState, FormEvent, useEffect } from 'react'
import { DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react'
import { LabelWithTooltip } from '@/components/ui/LabelWithTooltip'

interface CompoundInterestFormProps {
  onSubmit: (data: CompoundInterestInputs) => void
  isDisabled: boolean
  initialValues?: CompoundInterestInputs | null
}

export interface CompoundInterestInputs {
  initialAmount: number
  monthlyContribution: number
  annualReturn: number
  years: number
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually'
  includeInflation: boolean
  inflationRate: number
}

export function CompoundInterestForm({ onSubmit, isDisabled, initialValues }: CompoundInterestFormProps) {
  const defaultValues: CompoundInterestInputs = {
    initialAmount: 10000,
    monthlyContribution: 500,
    annualReturn: 7,
    years: 30,
    compoundingFrequency: 'monthly',
    includeInflation: false,
    inflationRate: 3,
  }

  const [formData, setFormData] = useState<CompoundInterestInputs>(defaultValues)

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues)
    }
  }, [initialValues])

  const handleChange = (field: keyof CompoundInterestInputs, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'boolean' ? value : value ? parseFloat(value) : '',
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Initial Investment */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Initial Investment</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LabelWithTooltip
              label="Starting Amount"
              tooltip="The initial amount you're investing right now"
              htmlFor="initialAmount"
            />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="initialAmount"
                type="number"
                step="100"
                min="0"
                value={formData.initialAmount}
                onChange={(e) => handleChange('initialAmount', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <LabelWithTooltip
              label="Monthly Contribution"
              tooltip="How much you plan to invest each month"
              htmlFor="monthlyContribution"
            />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="monthlyContribution"
                type="number"
                step="10"
                min="0"
                value={formData.monthlyContribution}
                onChange={(e) => handleChange('monthlyContribution', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Returns & Time */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Returns & Time Horizon</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LabelWithTooltip
              label="Expected Annual Return (%)"
              tooltip="The average yearly return you expect. Stock market historical average is ~7-10%"
              htmlFor="annualReturn"
            />
            <div className="relative">
              <input
                id="annualReturn"
                type="number"
                step="0.1"
                min="0"
                max="30"
                value={formData.annualReturn}
                onChange={(e) => handleChange('annualReturn', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div>
            <LabelWithTooltip
              label="Investment Period (Years)"
              tooltip="How long you plan to invest for"
              htmlFor="years"
            />
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="years"
                type="number"
                step="1"
                min="1"
                max="50"
                value={formData.years}
                onChange={(e) => handleChange('years', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <LabelWithTooltip
              label="Compounding Frequency"
              tooltip="How often the interest compounds. More frequent = slightly higher returns"
              htmlFor="compoundingFrequency"
            />
            <select
              id="compoundingFrequency"
              value={formData.compoundingFrequency}
              onChange={(e) => setFormData(prev => ({ ...prev, compoundingFrequency: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>
      </section>

      {/* Inflation Settings */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Percent className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Inflation Adjustment</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              id="includeInflation"
              type="checkbox"
              checked={formData.includeInflation}
              onChange={(e) => handleChange('includeInflation', e.target.checked)}
              className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
            <div>
              <label htmlFor="includeInflation" className="block text-sm font-medium text-gray-900 cursor-pointer">
                Adjust for Inflation (Show Real Value)
              </label>
              <p className="text-sm text-gray-600 mt-1">
                See what your money will actually be worth in today's dollars after accounting for inflation
              </p>
            </div>
          </div>

          {formData.includeInflation && (
            <div className="ml-8 mt-4">
              <LabelWithTooltip
                label="Expected Inflation Rate (%)"
                tooltip="The average yearly inflation rate. Historical US average is ~3%"
                htmlFor="inflationRate"
              />
              <div className="relative max-w-xs">
                <input
                  id="inflationRate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={formData.inflationRate}
                  onChange={(e) => handleChange('inflationRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isDisabled}
        className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        Calculate Growth
      </button>
    </form>
  )
}
