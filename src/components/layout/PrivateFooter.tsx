import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function PrivateFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-bold text-lg">Financial Freedom</span>
            </div>
            <p className="text-sm">
              Making financial planning accessible to everyone.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Top Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/buy-vs-rent" className="hover:text-white">Buy vs Rent</Link></li>
              <li><Link href="/calculators/compound-interest" className="hover:text-white">Compound Interest</Link></li>
              <li><Link href="/calculators/retirement" className="hover:text-white">Retirement Planning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Project</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              {/*<li><Link href="/blog" className="hover:text-white">Blog</Link></li>*/}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 Financial Freedom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
