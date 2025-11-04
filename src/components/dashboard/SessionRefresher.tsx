'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

/**
 * Auto-refreshes the session when the dashboard loads.
 * This ensures that any manual DB changes (like enabling lifetime access)
 * are reflected in the user's session.
 */
export function SessionRefresher() {
  const { update } = useSession()

  useEffect(() => {
    // Force session refresh on mount
    // This will trigger the JWT callback to fetch fresh data from DB
    update()
  }, [update])

  return null
}
