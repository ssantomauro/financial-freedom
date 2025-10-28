import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service - Financial Freedom',
  description: 'Terms of service for Financial Freedom calculators',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
          {/* Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600 mt-1">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-800">
              <strong>Important Notice:</strong> This is a template terms of service. You must have this reviewed and customized by a qualified attorney before using it. This template does not constitute legal advice.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using Financial Freedom ("the Service," "we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.
              </p>
              <p className="text-gray-700">
                We reserve the right to update these Terms at any time. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Financial Freedom provides online financial calculators and tools to help users make informed financial decisions. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Financial calculators (buy vs rent, retirement, mortgage, etc.)</li>
                <li>Calculation history and data storage (for paid subscribers)</li>
                <li>Educational content and resources</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Registration</h3>
              <p className="text-gray-700 mb-4">
                To access certain features, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payment</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lifetime Access</h3>
              <p className="text-gray-700 mb-4">
                We offer a one-time lifetime access subscription that provides:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Unlimited calculations on all calculators</li>
                <li>Access to calculation history</li>
                <li>Priority support</li>
                <li>Access to all future calculators and features</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Billing</h3>
              <p className="text-gray-700 mb-4">
                Payment is processed securely through our third-party payment processor. By providing payment information, you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Authorize us to charge the stated amount</li>
                <li>Confirm that the payment information is accurate</li>
                <li>Agree to pay all applicable fees and taxes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Policy</h3>
              <p className="text-gray-700">
                We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact us within 30 days for a full refund. After 30 days, all sales are final.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Impersonate another person or entity</li>
                <li>Transmit viruses or malicious code</li>
                <li>Harvest or collect user information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, features, and functionality of the Service, including but not limited to text, graphics, logos, code, and software, are owned by Financial Freedom or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                <strong className="text-red-600">IMPORTANT: The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.</strong>
              </p>
              <p className="text-gray-700 mb-4">
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>The results obtained from the Service will be accurate or reliable</li>
                <li>Any errors will be corrected</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Not Financial Advice</h2>
              <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6">
                <p className="text-amber-900 font-semibold mb-3">
                  ⚠️ CRITICAL DISCLAIMER
                </p>
                <p className="text-amber-900 mb-3">
                  The calculators and information provided through our Service are for educational and informational purposes only and do not constitute financial, investment, tax, or legal advice.
                </p>
                <p className="text-amber-900 mb-3">
                  You should not rely solely on information from our calculators to make financial decisions. Always consult with qualified financial, tax, and legal professionals before making any financial decisions.
                </p>
                <p className="text-amber-900">
                  We are not responsible for any financial decisions you make based on information provided by our Service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, Financial Freedom and its officers, directors, employees, and agents shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or use</li>
                <li>Damages resulting from your use or inability to use the Service</li>
                <li>Any financial losses resulting from decisions made based on our calculators</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our total liability shall not exceed the amount you paid for the Service in the last 12 months, or $100, whichever is less.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless Financial Freedom and its affiliates from any claims, liabilities, damages, losses, and expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Disputes</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [YOUR JURISDICTION], without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700">
                Any disputes arising from these Terms or the Service shall be resolved through [arbitration/courts in YOUR JURISDICTION].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Service</h2>
              <p className="text-gray-700">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We are not liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
              <p className="text-gray-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Entire Agreement</h2>
              <p className="text-gray-700">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Financial Freedom regarding the Service and supersede all prior agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Email:</strong> [YOUR EMAIL ADDRESS]</p>
                <p className="text-gray-700"><strong>Address:</strong> [YOUR BUSINESS ADDRESS]</p>
              </div>
            </section>

            {/* Legal Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Legal Disclaimer</h3>
              <p className="text-sm text-red-800">
                This terms of service template is provided for informational purposes only and does not constitute legal advice. You must consult with a qualified attorney to ensure these terms comply with all applicable laws and accurately reflect your business practices. Laws vary by jurisdiction and are subject to change. This template should be customized to your specific business needs and reviewed by legal counsel before use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
