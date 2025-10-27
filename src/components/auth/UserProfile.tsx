'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { LogoutButton } from './LogoutButton'

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.user_metadata?.name || user.email}
        </span>
      </div>
      <LogoutButton className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
        Logout
      </LogoutButton>
    </div>
  )
}
