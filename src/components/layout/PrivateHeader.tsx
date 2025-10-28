'use client'

import Link from 'next/link'
import Image from 'next/image'
import { UserDropdown } from '@/components/auth/UserDropdown'

export function PrivateHeader() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/financial_freedom_logo.png"
              alt="Financial Freedom"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-4">
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
