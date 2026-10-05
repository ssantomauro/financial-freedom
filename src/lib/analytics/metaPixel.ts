type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded: boolean
  version: string
  push: Fbq
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// Cookie set server-side when a new user signs up through Google OAuth,
// so the client can fire the signup conversion after the redirect
export const NEW_SIGNUP_COOKIE = 'ff_new_signup'

// Standard Meta Pixel bootstrap: queues calls until fbevents.js loads
export function initMetaPixel() {
  if (typeof window === 'undefined' || !META_PIXEL_ID || window.fbq) return

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      fbq.queue.push(args)
    }
  } as Fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  fbq('init', META_PIXEL_ID)
}

export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params)
  }
}
