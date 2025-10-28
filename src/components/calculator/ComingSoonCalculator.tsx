import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface ComingSoonCalculatorProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  features: string[]
}

export function ComingSoonCalculator({
  title,
  description,
  icon: Icon,
  iconColor,
  features
}: ComingSoonCalculatorProps) {
  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
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
          <div className={`w-16 h-16 ${iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            <p className="text-xl text-gray-600">
              {description}
            </p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're working hard on building this calculator. It will be available soon with powerful features to help you make better financial decisions!
            </p>
          </div>

          {/* Features Preview */}
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What this calculator will help you with:
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            In the meantime, check out our other available calculators
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            View All Calculators
          </Link>
        </div>
      </div>
    </div>
  )
}
