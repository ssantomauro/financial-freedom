'use client'

import { useSession } from 'next-auth/react'
import { LogoutButton } from './LogoutButton'

export function UserProfile() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const user = session?.user

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user?.name || user?.email}
        </span>
      </div>
      <LogoutButton className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
        Logout
      </LogoutButton>
    </div>
  )
}
