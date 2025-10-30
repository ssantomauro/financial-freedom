'use client'

import { useEffect } from 'react'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

export function DashboardTracker() {
  const { trackEvent } = usePostHog()

  useEffect(() => {
    trackEvent(AnalyticsEvents.DASHBOARD_VIEWED)
  }, [trackEvent])

  return null
}
