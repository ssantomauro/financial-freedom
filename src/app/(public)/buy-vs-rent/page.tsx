import Link from 'next/link'
import { Home, DollarSign, CheckCircle, ArrowRight, Zap } from 'lucide-react'
import { HomeNavigation } from '@/components/layout/HomeNavigation'
import { PublicFooter } from '@/components/layout/PublicFooter'

export const metadata = {
  title: 'Buy vs Rent Calculator - Make the Right Financial Decision',
  description: 'Professional buy vs rent calculator that helps you make informed housing decisions. Compare total costs, ROI, and long-term wealth impact. 100% free, no credit card required.',
  keywords: 'buy vs rent calculator, rent or buy calculator, housing calculator, real estate calculator, home buying calculator',
  openGraph: {
    title: 'Buy vs Rent Calculator - Make the Right Financial Decision',
    description: 'Compare buying vs renting with a free calculator that explains every step of the math.',
    type: 'website',
  },
}

export default async function BuyVsRentLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <HomeNavigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              100% Free - No Credit Card Required
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Should You <span className="text-blue-600">Buy</span> or <span className="text-purple-600">Rent</span>?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Compare the total costs, hidden expenses, and long-term wealth impact of buying vs renting,
              with every step of the math explained in plain English.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Start Calculating Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition"
              >
                How It Works
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Unlimited free calculations</span>
              </div>
            </div>
          </div>

          {/* Screenshot/Demo */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-2 shadow-2xl">
              <div className="bg-white rounded-xl p-8">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">Example result</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Home className="w-8 h-8 text-green-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Buying</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-bold text-gray-900">$523,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Worth:</span>
                        <span className="font-bold text-green-600">$387,230</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="w-8 h-8 text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Renting</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-bold text-gray-900">$432,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Worth:</span>
                        <span className="font-bold text-blue-600">$298,450</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    💡 Recommendation: <span className="text-green-600">Buying puts an extra $88,780 in your pocket</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/*<section className="py-20 px-4">*/}
      {/*  <div className="max-w-7xl mx-auto">*/}
      {/*    <div className="text-center mb-16">*/}
      {/*      <h2 className="text-4xl font-bold text-gray-900 mb-4">*/}
      {/*        Everything You Need to Make the Right Decision*/}
      {/*      </h2>*/}
      {/*      <p className="text-xl text-gray-600 max-w-3xl mx-auto">*/}
      {/*        Our calculator considers all the hidden costs and factors that other calculators miss*/}
      {/*      </p>*/}
      {/*    </div>*/}

      {/*    <div className="grid md:grid-cols-3 gap-8">*/}
      {/*      {[*/}
      {/*        {*/}
      {/*          icon: <Calculator className="w-8 h-8" />,*/}
      {/*          title: 'Comprehensive Analysis',*/}
      {/*          description: 'Includes property taxes, HOA fees, maintenance, insurance, PMI, closing costs, and more.',*/}
      {/*          color: 'blue',*/}
      {/*        },*/}
      {/*        {*/}
      {/*          icon: <TrendingUp className="w-8 h-8" />,*/}
      {/*          title: 'Investment Comparison',*/}
      {/*          description: 'See how investing your down payment and savings would grow vs building home equity.',*/}
      {/*          color: 'green',*/}
      {/*        },*/}
      {/*        {*/}
      {/*          icon: <Home className="w-8 h-8" />,*/}
      {/*          title: 'Real Market Data',*/}
      {/*          description: 'Accounts for home appreciation, rent increases, and realistic inflation rates.',*/}
      {/*          color: 'purple',*/}
      {/*        },*/}
      {/*        {*/}
      {/*          icon: <DollarSign className="w-8 h-8" />,*/}
      {/*          title: 'Net Worth Impact',*/}
      {/*          description: 'See your projected net worth under both scenarios over your chosen timeframe.',*/}
      {/*          color: 'orange',*/}
      {/*        },*/}
      {/*        {*/}
      {/*          icon: <CheckCircle className="w-8 h-8" />,*/}
      {/*          title: 'Save & Review',*/}
      {/*          description: 'Save unlimited calculations and review your history anytime.',*/}
      {/*          color: 'green',*/}
      {/*        },*/}
      {/*        {*/}
      {/*          icon: <Zap className="w-8 h-8" />,*/}
      {/*          title: 'Instant Results',*/}
      {/*          description: 'Get comprehensive analysis in seconds with beautiful, easy-to-understand results.',*/}
      {/*          color: 'blue',*/}
      {/*        },*/}
      {/*      ].map((feature, index) => (*/}
      {/*        <div*/}
      {/*          key={index}*/}
      {/*          className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition"*/}
      {/*        >*/}
      {/*          <div className={`w-16 h-16 bg-${feature.color}-100 rounded-xl flex items-center justify-center text-${feature.color}-600 mb-4`}>*/}
      {/*            {feature.icon}*/}
      {/*          </div>*/}
      {/*          <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>*/}
      {/*          <p className="text-gray-600">{feature.description}</p>*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to clarity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Enter Your Details',
                description: 'Input home price, rent amount, down payment, and other relevant financial information.',
              },
              {
                step: '2',
                title: 'Get Instant Analysis',
                description: 'Our calculator processes all factors including hidden costs, appreciation, and opportunity costs.',
              },
              {
                step: '3',
                title: 'Make Your Decision',
                description: 'See clear recommendations backed by comprehensive financial projections and data.',
              },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 relative">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-blue-200 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Completely Free</h2>
            <p className="text-xl text-gray-600 mb-8">
              No trials, no paywalls, no credit card. Create an account and use it as much as you want.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-xl mx-auto">
              {[
                'Unlimited calculations',
                'Every step of the math explained',
                'Save your calculations',
                'No credit card required',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'What makes this calculator different?',
                a: "Unlike simple calculators, we include ALL costs: property taxes, HOA fees, maintenance, insurance, PMI, closing costs, opportunity costs, and more. We don't just calculate the total costs, we also project your net worth under both scenarios.",
              },
              {
                q: 'Is it really free?',
                a: 'Yes. Every calculator is free to use with unlimited calculations. No credit card required.',
              },
              {
                q: 'Why do I need an account?',
                a: 'An account lets you save your calculations and come back to them later.',
              },
              {
                q: 'How accurate are the calculations?',
                a: 'Our calculator uses industry-standard formulas and accounts for real-world factors like appreciation, inflation, and opportunity costs. However, it\'s a tool to help inform your decision - always consult with a financial advisor for personalized advice, if you have any doubt.',
              },
              {
                q: 'Can I save and compare multiple scenarios?',
                a: 'You can save your calculations and review them later. Side-by-side comparison of different scenarios is coming soon.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Calculate Your Decision?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Plug in your own numbers and see which option makes more sense for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-blue-100 mt-6">
            100% free • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
