import Link from 'next/link'
import { Home, TrendingUp, Calculator, DollarSign, CheckCircle, ArrowRight, Users, Star, Zap } from 'lucide-react'
import { HomeNavigation } from '@/components/layout/HomeNavigation'
import { PublicFooter } from '@/components/layout/PublicFooter'

export const metadata = {
  title: 'Buy vs Rent Calculator - Make the Right Financial Decision',
  description: 'Professional buy vs rent calculator that helps you make informed housing decisions. Compare total costs, ROI, and long-term wealth impact. Special launch offer: $4.90 for first 100 users!',
  keywords: 'buy vs rent calculator, rent or buy calculator, housing calculator, real estate calculator, home buying calculator',
  openGraph: {
    title: 'Buy vs Rent Calculator - Make the Right Financial Decision',
    description: 'Compare buying vs renting with our professional calculator. Special launch offer: $4.90 (regularly $19.90)',
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
              Limited Time Offer - First 100 Users
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Should You <span className="text-blue-600">Buy</span> or <span className="text-purple-600">Rent</span>?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make the smartest financial decision of your life with our professional Buy vs Rent Calculator.
              Compare total costs, hidden expenses, and long-term wealth impact in minutes.
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
                href="#pricing"
                className="text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition"
              >
                View Pricing
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>3 free calculations</span>
              </div>
            </div>
          </div>

          {/* Screenshot/Demo */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-2 shadow-2xl">
              <div className="bg-white rounded-xl p-8">
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
                    💡 Recommendation: <span className="text-green-600">Buying saves you $88,780</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-3xl font-bold text-gray-900">100+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-3xl font-bold text-gray-900">1,000+</div>
                <div className="text-gray-600">Calculations Made</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                <div className="text-gray-600">User Rating</div>
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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Launch Pricing</h2>
            <p className="text-xl text-gray-600">Limited time offer for the first 100 users</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Trial</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900">$0</div>
                <div className="text-gray-600">Try before you buy</div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  '3 free calculations',
                  'Full feature access',
                  'Comprehensive analysis',
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
                className="block w-full bg-gray-100 text-gray-900 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Lifetime Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 border-2 border-blue-700 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE - 75% OFF
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lifetime Access</h3>
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-2xl text-white/70 line-through">$19.90</div>
                  <div className="text-5xl font-bold text-white">$4.90</div>
                </div>
                <div className="text-blue-100">One-time payment, forever</div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited calculations',
                  'Save & review history',
                  'All future features',
                  'Priority support',
                  'No recurring fees',
                  'Lifetime updates',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full bg-white text-blue-600 text-center px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg"
              >
                Get Lifetime Access - $4.90
              </Link>
              <p className="text-center text-blue-100 text-sm mt-4">
                ⚡ Only 21 spots left at this price!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real feedback from real people making real decisions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah J.',
                role: 'First-time Home Buyer',
                content: 'This calculator saved me from making a $100k mistake. The detailed breakdown showed me that renting and investing made more sense for my situation.',
                rating: 5,
              },
              {
                name: 'Michael C.',
                role: 'Third-time Home Buyer',
                content: 'I was going to buy my third estate and I used Financial Freedom to calculate the exact monthly cost. So far, it has been very accurate!',
                rating: 5,
              },
              {
                name: 'Sebastian T.',
                role: 'Financial Advisor',
                content: 'I personally tried the Buy Vs Rent Calculator, and it helped me to analyze the numbers from a different perspective. 100% suggested.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
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
                q: 'Is the $4.90 price really for lifetime access?',
                a: 'Yes! Pay once, use forever. This special pricing is only available for the first 100 users. After that, it goes up to $19.90.',
              },
              {
                q: 'Can I try it before buying?',
                a: 'Absolutely! You get 3 free calculations with full access to all features. No credit card required.',
              },
              {
                q: 'How accurate are the calculations?',
                a: 'Our calculator uses industry-standard formulas and accounts for real-world factors like appreciation, inflation, and opportunity costs. However, it\'s a tool to help inform your decision - always consult with a financial advisor for personalized advice, if you have any doubt.',
              },
              {
                q: 'Can I save and compare multiple scenarios?',
                a: 'Yes! With lifetime access, you can save unlimited calculations. We are still working on giving the chance to compare different scenarios as well!',
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
            Ready to Make the Right Decision?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join other smart home buyers and renters who made informed decisions with our calculator
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center justify-center gap-2"
            >
              Get Started Now - $4.90
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-blue-100 mt-6">
            ⚡ Limited time offer • 🔒 Secure payment
          </p>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
