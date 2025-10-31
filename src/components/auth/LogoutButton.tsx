'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

interface LogoutButtonProps {
  className?: string
  children?: React.ReactNode
}

export function LogoutButton({ className = '', children }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { trackEvent, resetUser } = usePostHog()

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      // Track logout
      trackEvent(AnalyticsEvents.LOGOUT)

      // Reset PostHog user identity
      resetUser()

      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Logging out...
        </span>
      ) : (
        children || 'Logout'
      )}
    </button>
  )
}
