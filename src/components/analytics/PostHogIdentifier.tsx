'use client'

import { useEffect } from 'react'
import { usePostHog } from '@/lib/posthog/hooks'

interface PostHogIdentifierProps {
  userId: string
  email?: string
  name?: string
  hasLifetimeAccess?: boolean
}

export function PostHogIdentifier({ userId, email, name, hasLifetimeAccess }: PostHogIdentifierProps) {
  const { identifyUser } = usePostHog()

  useEffect(() => {
    // Identify the user with PostHog
    identifyUser(userId, {
      email,
      name,
      has_lifetime_access: hasLifetimeAccess,
    })
  }, [userId, email, name, hasLifetimeAccess, identifyUser])

  // This component doesn't render anything
  return null
}
