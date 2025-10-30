'use client'

import { X, Calculator } from 'lucide-react'

interface BuyVsRentExplanationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BuyVsRentExplanationModal({ isOpen, onClose }: BuyVsRentExplanationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl relative overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Why this calculator is different
          </h2>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              I know, you feel overwhelmed by the decision you have to make. Buying or renting? Which one is better?<br/>
              I was in your shoes, and I knew I had to make a decision. So I did the obvious thing:
              I built my own calculator tailored to my needs, because on many sites offering this type of calculator,
              I could not find what I was looking for.<br/>
              Some were missing really basic parts of the "equation", and even the best one I found (which I initially thought would work)
              overlooked something crucial to me: when you buy a house, you need to put money down upfront
              (say, $50k for the down payment). When you rent, you obviously don't need that cash—but that doesn't
              mean you can't invest it elsewhere (like putting that $50k into the S&P 500).<br/><br/>

              Why does this matter? Because this calculator has one primary goal: optimize your money, show you how much money you'll
              have after X years (for example, after a 30-year mortgage)—whether you buy or rent.<br/>
              Shortly, it's designed to give you a practical answer: <strong>which choice will build more wealth, and by how much?</strong>
            </p>
          </div>

          {/*<h2 className="text-3xl font-bold text-gray-900 text-center mb-6">*/}
          {/*  Behind the Buy vs Rent Calculator*/}
          {/*</h2>*/}

          {/*<div className="mb-6">*/}
          {/*  <p className="text-gray-700 leading-relaxed">*/}
          {/*    Rent or buy—it's one of the biggest financial decisions you'll ever make. Our calculator cuts through the complexity*/}
          {/*    by focusing purely on the numbers, with no bias. We run projections based on factors like how home values typically grow*/}
          {/*    over time and how rental costs tend to increase year after year.<br/>*/}
          {/*    Here's the truth: we can't see into a crystal ball. Real estate markets shift, personal circumstances change,*/}
          {/*    and life rarely follows a straight line. That's why we call these estimates, not guarantees.*/}
          {/*    Think of our calculator as a powerful starting point for your decision-making process.<br/>*/}
          {/*    But here's what no calculator can measure—the emotional and lifestyle factors that make this choice so personal.*/}
          {/*    Homeownership means freedom: renovate your kitchen, paint every room purple, or fill your yard with garden gnomes*/}
          {/*    without asking anyone's permission, and... making memories with your loved ones!<br/>*/}
          {/*    On the other side, renting offers different perks: no surprise repair bills, no property taxes, and the flexibility to pick up*/}
          {/*    and move when a new opportunity comes along.<br/>*/}
          {/*    The bottom line? Run the numbers with our calculator, then ask yourself what kind of lifestyle fits you best right now.<br/>*/}
          {/*  </p>*/}
          {/*</div>*/}

          {/*<div className="mb-8">*/}
          {/*  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">*/}
          {/*    Why our calculator is different*/}
          {/*  </h3>*/}

          {/*  <div className="space-y-4">*/}
          {/*    <div>*/}
          {/*      <p className="text-gray-700 text-md mb-2">*/}
          {/*        On many sites offering this type of calculator, we noticed they omit key parts of the calculations.*/}
          {/*        When I faced my own Buy vs. Rent decision, the numbers didn't add up—not even close.*/}
          {/*        So I did the obvious thing: I built my own calculator tailored to my needs and compared it with the others.*/}
          {/*        Some were missing really basic components, and even the best one I found (which I initially thought would work)*/}
          {/*        overlooked something crucial to me: when you buy a house, you need to put money down upfront*/}
          {/*        (say, $50k for the down payment). When you rent, you obviously don't need that cash—but that doesn't*/}
          {/*        mean you can't invest it elsewhere (like putting that $50k into the S&P 500).<br/><br/>*/}

          {/*        Why does this matter? Because this calculator has one primary goal: to show you how much money you'll*/}
          {/*        have after X years (for example, after a 30-year mortgage)—whether you buy or rent. It's designed to*/}
          {/*        give you a practical answer: which choice will build more wealth, and by how much?*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*/!* Buying Calculations *!/*/}
          {/*<div className="mb-8">*/}
          {/*  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">*/}
          {/*    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">1</span>*/}
          {/*    Buying Calculations*/}
          {/*  </h3>*/}

          {/*  <div className="space-y-4 ml-10">*/}
          {/*    <div>*/}
          {/*      <h4 className="font-semibold text-gray-900 mb-2">Monthly Mortgage Payment</h4>*/}
          {/*      <p className="text-gray-700 text-sm mb-2">*/}
          {/*        Calculated using the standard mortgage formula:*/}
          {/*      </p>*/}
          {/*      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">*/}
          {/*        M = P × [r(1 + r)^n] / [(1 + r)^n - 1]*/}
          {/*      </div>*/}
          {/*      <ul className="text-sm text-gray-600 mt-2 space-y-1">*/}
          {/*        <li>• <strong>M</strong> = Monthly payment</li>*/}
          {/*        <li>• <strong>P</strong> = Principal (home price - down payment)</li>*/}
          {/*        <li>• <strong>r</strong> = Monthly interest rate (annual rate / 12)</li>*/}
          {/*        <li>• <strong>n</strong> = Total number of payments (years × 12)</li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}

          {/*    <div>*/}
          {/*      <h4 className="font-semibold text-gray-900 mb-2">Total Buying Costs</h4>*/}
          {/*      <p className="text-gray-700 text-sm">*/}
          {/*        We sum up all costs over the loan term:*/}
          {/*      </p>*/}
          {/*      <ul className="text-sm text-gray-600 mt-2 space-y-1">*/}
          {/*        <li>• Monthly mortgage payments (principal + interest)</li>*/}
          {/*        <li>• Property taxes (increases annually with home appreciation)</li>*/}
          {/*        <li>• Home insurance</li>*/}
          {/*        <li>• HOA fees</li>*/}
          {/*        <li>• Maintenance costs</li>*/}
          {/*        <li>• PMI (if down payment &lt; 20%)</li>*/}
          {/*        <li>• Closing costs when buying (typically 2-5% of home price)</li>*/}
          {/*        <li>• Closing costs when selling (typically 6-10% of home price)</li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}

          {/*    <div>*/}
          {/*      <h4 className="font-semibold text-gray-900 mb-2">Home Equity & Net Worth</h4>*/}
          {/*      <p className="text-gray-700 text-sm">*/}
          {/*        Your home's value grows with appreciation, and your equity increases as you pay down the mortgage:*/}
          {/*      </p>*/}
          {/*      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mt-2">*/}
          {/*        Net Worth = Home Value × (1 + appreciation rate)^years - Total Costs Paid - Selling Costs*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*/!* Renting Calculations *!/*/}
          {/*<div className="mb-8">*/}
          {/*  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">*/}
          {/*    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">2</span>*/}
          {/*    Renting Calculations*/}
          {/*  </h3>*/}

          {/*  <div className="space-y-4 ml-10">*/}
          {/*    <div>*/}
          {/*      <h4 className="font-semibold text-gray-900 mb-2">Total Rent Paid</h4>*/}
          {/*      <p className="text-gray-700 text-sm">*/}
          {/*        Rent increases annually based on the rent increase rate you specify:*/}
          {/*      </p>*/}
          {/*      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mt-2">*/}
          {/*        Year N Rent = Initial Rent × (1 + rent increase rate)^(N-1)*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*    <div>*/}
          {/*      <h4 className="font-semibold text-gray-900 mb-2">Investment Growth</h4>*/}
          {/*      <p className="text-gray-700 text-sm mb-2">*/}
          {/*        The key advantage of renting: you invest the money you would have spent on buying. This includes:*/}
          {/*      </p>*/}
          {/*      <ul className="text-sm text-gray-600 mt-2 space-y-1">*/}
          {/*        <li>• The down payment (invested at the beginning)</li>*/}
          {/*        <li>• Monthly savings (difference between buying costs and renting costs)</li>*/}
          {/*        <li>• These investments grow with compound interest at your specified investment return rate</li>*/}
          {/*      </ul>*/}
          {/*      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mt-2">*/}
          {/*        Investment Value = (Previous Balance + Monthly Contribution) × (1 + annual return rate)*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*    <div>*/}
          {/*      <h4 className="font-semibold text-gray-900 mb-2">Renting Net Worth</h4>*/}
          {/*      <p className="text-gray-700 text-sm">*/}
          {/*        Your net worth when renting is calculated as:*/}
          {/*      </p>*/}
          {/*      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mt-2">*/}
          {/*        Net Worth = Total Investment Value - Total Rent Paid*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*/!* Final Comparison *!/*/}
          {/*<div className="mb-6">*/}
          {/*  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">*/}
          {/*    <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">3</span>*/}
          {/*    The Final Comparison*/}
          {/*  </h3>*/}

          {/*  <div className="ml-10">*/}
          {/*    <p className="text-gray-700 text-sm mb-3">*/}
          {/*      We compare the net worth in both scenarios after the specified time period:*/}
          {/*    </p>*/}
          {/*    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">*/}
          {/*      <p className="text-sm text-blue-900">*/}
          {/*        <strong>If Buying Net Worth &gt; Renting Net Worth:</strong> We recommend buying<br />*/}
          {/*        <strong>If Renting Net Worth &gt; Buying Net Worth:</strong> We recommend renting*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*    <p className="text-gray-700 text-sm mt-3">*/}
          {/*      The calculator shows you the potential savings (the difference between the two net worth values)*/}
          {/*      to help you make an informed decision.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*/!* Close Button *!/*/}
          {/*<div className="mt-6 text-center">*/}
          {/*  <button*/}
          {/*    onClick={onClose}*/}
          {/*    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"*/}
          {/*  >*/}
          {/*    Got it, thanks!*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}
