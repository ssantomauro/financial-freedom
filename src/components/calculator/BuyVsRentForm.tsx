'use client'

import { useState, FormEvent, useEffect } from 'react'
import { Home, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { LabelWithTooltip } from '@/components/ui/LabelWithTooltip'

interface BuyVsRentFormProps {
  onSubmit: (data: BuyVsRentInputs) => void
  isDisabled: boolean
  initialValues?: BuyVsRentInputs | null
}

export interface BuyVsRentInputs {
  // Purchase Details
  homePrice: number
  downPayment: number
  interestRate: number
  loanTerm: number

  // Monthly Costs - Buying
  closingCostsBuying: number
  closingCostsSelling: number
  propertyTax: number
  pmiRate: number
  homeInsurance: number
  hoaFees: number
  maintenanceRate: number

  // Monthly Costs - Renting
  monthlyRent: number
  rentersInsurance: number

  // Investment Assumptions
  homeAppreciation: number
  rentIncrease: number
  investmentReturn: number

  // Time Horizon
  // yearsToCompare: number
}

export function BuyVsRentForm({ onSubmit, isDisabled, initialValues }: BuyVsRentFormProps) {
  const defaultValues: BuyVsRentInputs = {
    homePrice: 400000,
    downPayment: 20,
    interestRate: 6.5,
    loanTerm: 30,
    closingCostsBuying: 2.0,
    closingCostsSelling: 0,
    propertyTax: 1,
    pmiRate: 1,
    maintenanceRate: 2,
    hoaFees: 100,
    homeInsurance: 1200,
    monthlyRent: 2000,
    rentersInsurance: 20,
    homeAppreciation: 3,
    rentIncrease: 3,
    investmentReturn: 7,
    // yearsToCompare: 10,
  }

  const [formData, setFormData] = useState<BuyVsRentInputs>(defaultValues)

  // Update form data when initialValues change
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues)
    }
  }, [initialValues])

  const handleChange = (field: keyof BuyVsRentInputs, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value ? parseFloat(value) : '',
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Purchase Details */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Purchase Details</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.homePrice}
                onChange={(e) => handleChange('homePrice', e.target.value)}
                disabled={isDisabled}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                value={formData.downPayment}
                onChange={(e) => handleChange('downPayment', e.target.value)}
                disabled={isDisabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ${((formData.homePrice * formData.downPayment) / 100).toFixed(0)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mortgage Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.interestRate}
              onChange={(e) => handleChange('interestRate', e.target.value)}
              disabled={isDisabled}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (years)
            </label>
            <select
              value={formData.loanTerm}
              onChange={(e) => handleChange('loanTerm', e.target.value)}
              disabled={isDisabled}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>
      </section>

      {/* Additional Costs - Buying */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Additional Costs - Buying</h3>
          </div>
          <p className="text-sm text-gray-600 italic ml-[52px]">
            This is the section most people ignore and that usually makes a huge difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LabelWithTooltip
              label="Closing Costs (buying) (%)"
              tooltip="One-time costs for finalizing the purchase (appraisal, title insurance, attorney fees, etc.). Typically 2-5% of home price"
            />
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={formData.closingCostsBuying}
                onChange={(e) => handleChange('closingCostsBuying', e.target.value)}
                disabled={isDisabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <LabelWithTooltip
              label="Closing Costs (selling) (%)"
              tooltip="One-time costs for finalizing the sell (appraisal, title insurance, attorney fees, etc.). Typically 4-8% of home price. Set 0 if you think you will never sell the property"
            />
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={formData.closingCostsSelling}
                onChange={(e) => handleChange('closingCostsSelling', e.target.value)}
                disabled={isDisabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <LabelWithTooltip
              label="Property Tax Rate (%)"
              tooltip="Annual property tax as a percentage of home value. Typical rates range from 0.5% to 2.5% depending on location."
            />
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={formData.propertyTax}
                onChange={(e) => handleChange('propertyTax', e.target.value)}
                disabled={isDisabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <LabelWithTooltip
              label="PMI Rate (%)"
              tooltip="Private Mortgage Insurance - required if down payment is less than 20%. Typically 0.3-1.5% of loan amount annually"
            />
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={formData.pmiRate}
                onChange={(e) => handleChange('pmiRate', e.target.value)}
                disabled={isDisabled || (formData.downPayment >= 20)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Insurance (yearly)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="100"
                value={formData.homeInsurance}
                onChange={(e) => handleChange('homeInsurance', e.target.value)}
                disabled={isDisabled}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HOA Fees (monthly)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="50"
                value={formData.hoaFees}
                onChange={(e) => handleChange('hoaFees', e.target.value)}
                disabled={isDisabled}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <LabelWithTooltip
                label="Maintenance (% of home value)"
                tooltip="Annual maintenance and repairs as percentage of home value. Rule of thumb is 0.5-3% for ongoing upkeep. Tip: for newer properties and/or expensive markets you can stay in the lower range"
            />
            <div className="relative">
              <input
                type="number"
                step="0.5"
                value={formData.maintenanceRate}
                onChange={(e) => handleChange('maintenanceRate', e.target.value)}
                disabled={isDisabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Costs - Renting */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Monthly Costs - Renting</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Rent
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="100"
                value={formData.monthlyRent}
                onChange={(e) => handleChange('monthlyRent', e.target.value)}
                disabled={isDisabled}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Renters Insurance (monthly)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="1"
                value={formData.rentersInsurance}
                onChange={(e) => handleChange('rentersInsurance', e.target.value)}
                disabled={isDisabled}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Assumptions */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Investment Assumptions</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LabelWithTooltip
                label="Home Appreciation Rate (% per year)"
                tooltip="Expected annual increase in home value. Historical average is 3-4%, but varies by location and market conditions"
            />
            <input
              type="number"
              step="0.5"
              value={formData.homeAppreciation}
              onChange={(e) => handleChange('homeAppreciation', e.target.value)}
              disabled={isDisabled}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rent Increase Rate (% per year)
            </label>
            <input
              type="number"
              step="0.5"
              value={formData.rentIncrease}
              onChange={(e) => handleChange('rentIncrease', e.target.value)}
              disabled={isDisabled}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <LabelWithTooltip
                label="Investment Return Rate (% per year)"
                tooltip="Expected annual return from investing your down payment and the monthly difference between buying or renting in stock market. This value depends on the market conditions and the investment strategy you choose. I would suggest something between 6-10%, considering the historical S&P 500 average is ~10%"
            />
            <input
              type="number"
              step="0.5"
              value={formData.investmentReturn}
              onChange={(e) => handleChange('investmentReturn', e.target.value)}
              disabled={isDisabled}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/*<div>*/}
          {/*  <label className="block text-sm font-medium text-gray-700 mb-2">*/}
          {/*    Years to Compare*/}
          {/*  </label>*/}
          {/*  <div className="relative">*/}
          {/*    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />*/}
          {/*    <input*/}
          {/*      type="number"*/}
          {/*      value={formData.yearsToCompare}*/}
          {/*      onChange={(e) => handleChange('yearsToCompare', e.target.value)}*/}
          {/*      disabled={isDisabled}*/}
          {/*      min="1"*/}
          {/*      max="30"*/}
          {/*      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"*/}
          {/*      required*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:hover:shadow-lg"
        >
          {isDisabled ? 'Form Locked - Subscription Required' : 'Calculate Results'}
        </button>
      </div>
    </form>
  )
}
