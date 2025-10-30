import Link from 'next/link'
import { Target, Heart, Lightbulb, TrendingUp } from 'lucide-react'
import { HomeNavigation } from '@/components/layout/HomeNavigation'
import { PrivateFooter } from '@/components/layout/PrivateFooter'
import { AboutPageTracker } from './AboutPageTracker'

export const metadata = {
  title: 'About - Financial Freedom',
  description: 'Learn about Financial Freedom and our mission to make financial planning accessible to everyone',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Track page view */}
      <AboutPageTracker />

      {/* Navigation */}
      <HomeNavigation />

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Financial Freedom
            </h1>
            <p className="text-xl text-gray-600">
              Empowering individuals to make informed financial decisions through simple, accessible tools
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Hi! I'm the creator of Financial Freedom, and I built this platform to solve a problem I faced myself:
                making important financial decisions without complicated spreadsheets or expensive financial advisors.
              </p>
              <p>
                When I was deciding whether to buy or rent my first home, I spent hours building complex Excel models
                to compare the true costs. I realized that these calculations shouldn't be this difficult—everyone
                deserves access to clear, simple tools that help them make confident financial decisions.
              </p>
              <p>
                That's why I created Financial Freedom: a collection of straightforward calculators that break down
                complex financial scenarios into understandable results. No jargon, no hidden fees, just honest tools
                to help you plan your financial future.
              </p>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-600">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mission</h3>
              <p className="text-gray-600 text-sm">
                To democratize financial planning by providing free, easy-to-use calculators that help people
                make informed decisions about their money.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-600">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Values</h3>
              <p className="text-gray-600 text-sm">
                Transparency, simplicity, and accessibility. No hidden agendas, no complex jargon—just honest
                tools that respect your time and intelligence.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-600">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vision</h3>
              <p className="text-gray-600 text-sm">
                A world where everyone has the tools and knowledge to make confident financial decisions,
                regardless of their background or income level.
              </p>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              What Makes Financial Freedom Different
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No Hidden Costs</h4>
                  <p className="text-gray-600 text-sm">
                    Start with 3 free calculations per calculator. One affordable lifetime payment for unlimited access—no subscriptions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Actually Simple</h4>
                  <p className="text-gray-600 text-sm">
                    No overwhelming spreadsheets or confusing interfaces. Enter your numbers, get clear results.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Privacy Focused</h4>
                  <p className="text-gray-600 text-sm">
                    Your financial data stays private. We don't sell your information or track you across the web.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Built by Users, For Users</h4>
                  <p className="text-gray-600 text-sm">
                    Every feature is designed based on real needs from people making real financial decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-6 mb-12">
            <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Important Note
            </h3>
            <p className="text-sm text-amber-900">
              Financial Freedom provides educational tools and calculators for informational purposes only.
              I am not a financial advisor, and these tools do not constitute financial advice. Always consult
              with a qualified financial professional before making important financial decisions.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Ready to take control of your financial future?
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Start For Free
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              3 free calculations per calculator • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <PrivateFooter />
    </div>
  )
}
