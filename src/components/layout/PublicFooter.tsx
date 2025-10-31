import Link from 'next/link'

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
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
              <li><Link href="/buy-vs-rent" className="hover:text-white transition">Buy vs Rent</Link></li>
              <li><Link href="/compound-interest" className="hover:text-white transition">Compound Interest</Link></li>
              <li><Link href="/retirement" className="hover:text-white transition">Retirement Planning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link></li>
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
