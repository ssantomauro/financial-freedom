'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initMetaPixel, trackMetaEvent, META_PIXEL_ID, NEW_SIGNUP_COOKIE } from '@/lib/analytics/metaPixel'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

export function MetaPixel() {
  const pathname = usePathname()
  const { trackEvent } = usePostHog()

  useEffect(() => {
    initMetaPixel()
  }, [])

  // Track page views on every client-side navigation
  useEffect(() => {
    if (!pathname || !META_PIXEL_ID) return
    trackMetaEvent('PageView')
  }, [pathname])

  // Fire the signup conversion for new Google OAuth users.
  // Deferred so PostHog (initialized in a parent effect) is ready first.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const match = document.cookie.match(new RegExp(`(?:^|; )${NEW_SIGNUP_COOKIE}=([^;]*)`))
      if (!match) return

      document.cookie = `${NEW_SIGNUP_COOKIE}=; Max-Age=0; path=/`
      const method = decodeURIComponent(match[1])
      trackMetaEvent('CompleteRegistration', { method })
      trackEvent(AnalyticsEvents.SIGNUP_COMPLETED, { method })
    }, 0)
    return () => clearTimeout(timeout)
  }, [pathname, trackEvent])

  return null
}
