'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { UserDropdown } from '@/components/auth/UserDropdown'

export function PrivateHeader() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Financial Freedom</span>
          </Link>

          <div className="flex items-center gap-4">
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
