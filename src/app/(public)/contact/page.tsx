import Link from 'next/link'
import { Mail, MessageSquare } from 'lucide-react'
import { HomeNavigation } from '@/components/layout/HomeNavigation'
import { PrivateFooter } from '@/components/layout/PrivateFooter'
import { ContactPageTracker } from './ContactPageTracker'

export const metadata = {
  title: 'Contact Us - Financial Freedom',
  description: 'Get in touch with us for support, questions, or feedback',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Track page view */}
      <ContactPageTracker />

      {/* Navigation */}
      <HomeNavigation />

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600">
              We'd love to hear from you! Have questions, feedback, or need support?
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Support */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Email Support
              </h2>
              <p className="text-gray-600 text-center mb-6">
                For general inquiries, support requests, or feedback
              </p>
              <div className="text-center">
                <a
                  href="mailto:support@financialfreedom.com"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
                >
                  support@financialfreedom.com
                </a>
              </div>
            </div>

            {/* General Inquiries */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                General Inquiries
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Questions about our calculators, features, or partnerships
              </p>
              <div className="text-center">
                <a
                  href="mailto:hello@financialfreedom.com"
                  className="text-green-600 hover:text-green-700 font-semibold text-lg"
                >
                  hello@financialfreedom.com
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              What to Expect
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
                <p className="text-gray-700 text-sm">
                  Average response time for support inquiries
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-gray-700 text-sm">
                  We read and respond to every message
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-gray-700 text-sm">
                  Submit your inquiry anytime, we'll get back to you
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Ready to start calculating?
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start For Free
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <PrivateFooter />
    </div>
  )
}
