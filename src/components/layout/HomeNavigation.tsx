import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { getUser } from '@/lib/auth/getUser'
import { UserDropdown } from '@/components/auth/UserDropdown'

export async function HomeNavigation() {
  const user = await getUser()

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Financial Freedom</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <UserDropdown />
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
