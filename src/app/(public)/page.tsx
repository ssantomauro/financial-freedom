import Link from 'next/link'
import { Calculator, TrendingUp, Home, Baby, PiggyBank, Target, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Navigation */}
        <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Financial Freedom</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Log In
                </Link>
                <Link
                    href="/signup"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <TrendingUp className="w-4 h-4" />
              Make Smarter Financial Decisions Today
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your Money with<br />
              <span className="text-blue-600">Smart Financial Calculators</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Free tools to help you plan for retirement, compare rent vs. buy, calculate compound interest,
              and make confident financial decisions for your family's future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                Start Calculating Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                  href="#calculators"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition"
              >
                Explore Tools
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                No Credit Card Required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                100% Free Forever
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Trusted by 50,000+ Users
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section id="calculators" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                All Your Financial Tools in One Place
              </h2>
              <p className="text-xl text-gray-600">
                Choose a calculator and start making smarter financial decisions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculators.map((calc) => (
                  <CalculatorCard key={calc.id} {...calc} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Get financial clarity in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose Your Calculator</h3>
                <p className="text-gray-600">
                  Select from our range of financial tools designed for real-life decisions
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Enter Your Numbers</h3>
                <p className="text-gray-600">
                  Input your financial details and see results update in real-time
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Make Smart Decisions</h3>
                <p className="text-gray-600">
                  Get clear insights and save your calculations for future reference
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Financial Freedom?
                </h2>
                <div className="space-y-6">
                  <BenefitItem
                      title="100% Free Forever"
                      description="No hidden fees, no premium tiers. All tools are completely free for everyone."
                  />
                  <BenefitItem
                      title="No Financial Expertise Needed"
                      description="Easy-to-use calculators with helpful explanations at every step."
                  />
                  <BenefitItem
                      title="Save & Track Your Progress"
                      description="Create an account to save calculations and track your financial journey."
                  />
                  <BenefitItem
                      title="Privacy First"
                      description="Your data is encrypted and never shared. We respect your financial privacy."
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-2xl">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <Calculator className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Ready to Take Control?</h3>
                  <p className="text-gray-600 mb-6">
                    Join thousands of users making smarter financial decisions every day.
                  </p>
                  <Link
                      href="/signup"
                      className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Journey to Financial Freedom
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              No credit card required. Get instant access to all calculators.
            </p>
            <Link
                href="/signup"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              Get Started Now - It's Free
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  <span className="text-white font-bold text-lg">Financial Freedom</span>
                </div>
                <p className="text-sm">
                  Making financial planning accessible to everyone.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Calculators</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/buy-vs-rent" className="hover:text-white">Buy vs Rent</Link></li>
                  <li><Link href="/compound-interest" className="hover:text-white">Compound Interest</Link></li>
                  <li><Link href="/retirement" className="hover:text-white">Retirement Planning</Link></li>
                  <li><Link href="/savings" className="hover:text-white">Savings Goals</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-sm">
              <p>&copy; 2025 Financial Freedom. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  )
}

// Calculator Card Component
function CalculatorCard({
                          icon: Icon,
                          title,
                          description,
                          href,
                          color
                        }: {
  icon: any
  title: string
  description: string
  href: string
  color: string
}) {
  return (
      <Link
          href={href}
          className="group block p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
      >
        <div className={`w-14 h-14 ${color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
          Try Calculator
          <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
  )
}

// Benefit Item Component
function BenefitItem({ title, description }: { title: string, description: string }) {
  return (
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
  )
}

// Calculators Data
const calculators = [
  {
    id: 'buy-vs-rent',
    icon: Home,
    title: 'Buy vs Rent Calculator',
    description: 'Should you buy or rent? Compare the true costs and make the right housing decision for your situation.',
    href: '/buy-vs-rent',
    color: 'bg-blue-500'
  },
  {
    id: 'compound-interest',
    icon: TrendingUp,
    title: 'Compound Interest Calculator',
    description: 'See how your money grows over time with compound interest. Visualize the power of consistent investing.',
    href: '/compound-interest',
    color: 'bg-green-500'
  },
  {
    id: 'retirement',
    icon: Target,
    title: 'Retirement Calculator',
    description: 'Plan for a comfortable retirement. Calculate how much you need to save and when you can retire.',
    href: '/retirement',
    color: 'bg-purple-500'
  },
  {
    id: 'savings',
    icon: PiggyBank,
    title: 'Savings Goal Calculator',
    description: 'Set and achieve your savings goals. Calculate monthly contributions needed for any financial target.',
    href: '/savings',
    color: 'bg-orange-500'
  },
  {
    id: 'children',
    icon: Baby,
    title: 'Children Savings Calculator',
    description: 'Plan for your children\'s future. Calculate education costs and monthly savings needed.',
    href: '/children-savings',
    color: 'bg-pink-500'
  },
  {
    id: 'mortgage',
    icon: Calculator,
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payments, total interest, and amortization schedule.',
    href: '/mortgage',
    color: 'bg-indigo-500'
  }
]