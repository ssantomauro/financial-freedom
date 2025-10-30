'use client'

import { useEffect } from 'react'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

export function ContactPageTracker() {
  const { trackEvent } = usePostHog()

  useEffect(() => {
    trackEvent(AnalyticsEvents.CONTACT_PAGE_VIEWED)
  }, [trackEvent])

  return null
}
