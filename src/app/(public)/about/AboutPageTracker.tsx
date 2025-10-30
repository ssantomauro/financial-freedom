'use client'

import { useEffect } from 'react'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

export function AboutPageTracker() {
  const { trackEvent } = usePostHog()

  useEffect(() => {
    trackEvent(AnalyticsEvents.ABOUT_PAGE_VIEWED)
  }, [trackEvent])

  return null
}
