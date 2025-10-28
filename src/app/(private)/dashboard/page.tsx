import Link from 'next/link'
import { Calculator, TrendingUp, Home, Baby, PiggyBank, Target, ArrowRight } from 'lucide-react'
import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { CalculationHistory } from '@/components/dashboard/CalculationHistory'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's lifetime access status
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    select: { hasLifetimeAccess: true },
  })

  const hasLifetimeAccess = dbUser?.hasLifetimeAccess || false

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back{user.user_metadata?.full_name || user.user_metadata?.name ? `, ${user.user_metadata?.full_name || user.user_metadata?.name}` : ''}!
          </h1>
          <p className="text-xl text-gray-600">
            Choose a calculator to start making smarter financial decisions
          </p>
        </div>

        {/* Calculation History */}
        <CalculationHistory hasLifetimeAccess={hasLifetimeAccess} />

        {/* Calculators Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Calculators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calc) => (
              <CalculatorCard key={calc.id} {...calc} />
            ))}
          </div>
        </section>
      </div>
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
        Open Calculator
        <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}

// Calculators Data
const calculators = [
  {
    id: 'buy-vs-rent',
    icon: Home,
    title: 'Buy vs Rent Calculator',
    description: 'Should you buy or rent? Compare the true costs and make the right housing decision for your situation.',
    href: '/calculators/buy-vs-rent',
    color: 'bg-blue-500'
  },
  {
    id: 'compound-interest',
    icon: TrendingUp,
    title: 'Compound Interest Calculator',
    description: 'See how your money grows over time with compound interest. Visualize the power of consistent investing.',
    href: '/calculators/compound-interest',
    color: 'bg-green-500'
  },
  {
    id: 'retirement',
    icon: Target,
    title: 'Retirement Calculator',
    description: 'Plan for a comfortable retirement. Calculate how much you need to save and when you can retire.',
    href: '/calculators/retirement',
    color: 'bg-purple-500'
  },
  {
    id: 'savings',
    icon: PiggyBank,
    title: 'Savings Goal Calculator',
    description: 'Set and achieve your savings goals. Calculate monthly contributions needed for any financial target.',
    href: '/calculators/savings',
    color: 'bg-orange-500'
  },
  {
    id: 'children',
    icon: Baby,
    title: 'Children Savings Calculator',
    description: 'Plan for your children\'s future. Calculate education costs and monthly savings needed.',
    href: '/calculators/children-savings',
    color: 'bg-pink-500'
  },
  {
    id: 'mortgage',
    icon: Calculator,
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payments, total interest, and amortization schedule.',
    href: '/calculators/mortgage',
    color: 'bg-indigo-500'
  }
]
