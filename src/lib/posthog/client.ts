import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window !== 'undefined') {
    // Only initialize on client side
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

    if (!apiKey) {
      console.warn('PostHog API key not found. Analytics will not be tracked.')
      return
    }

    posthog.init(apiKey, {
      api_host: apiHost,
      // Enable session recording
      autocapture: true,
      capture_pageview: true,
      capture_pageleave: true,
      // Privacy-friendly settings
      persistence: 'localStorage',
      // Helpful debug mode during development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
        }
      },
    })
  }
}

export { posthog }
