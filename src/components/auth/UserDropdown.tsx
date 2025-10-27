'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { ChevronDown, LogOut, User as UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserDropdown() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    getUser()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/login')
        router.refresh()
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
      setIsOpen(false)
    }
  }

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

  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email
  const initials = displayName?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.user_metadata?.full_name || user.user_metadata?.name || 'Account'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.user_metadata?.full_name || user.user_metadata?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
    </div>
  )
}
