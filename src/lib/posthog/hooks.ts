'use client'

import { useCallback } from 'react'
import { posthog } from './client'

export function usePostHog() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties)
    }
  }, [])

  const identifyUser = useCallback((userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, properties)
    }
  }, [])

  const resetUser = useCallback(() => {
    if (typeof window !== 'undefined') {
      posthog.reset()
    }
  }, [])

  return { trackEvent, identifyUser, resetUser }
}

// Event tracking helpers for common actions
export const AnalyticsEvents = {
  // Authentication
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  LOGIN_STARTED: 'login_started',
  LOGIN_COMPLETED: 'login_completed',
  LOGOUT: 'logout',

  // Calculator Usage
  CALCULATOR_OPENED: 'calculator_opened',
  CALCULATOR_STARTED: 'calculator_started',
  CALCULATION_COMPLETED: 'calculation_completed',
  CALCULATION_SAVED: 'calculation_saved',
  CALCULATION_HISTORY_VIEWED: 'calculation_history_viewed',
  PAST_CALCULATION_OPENED: 'past_calculation_opened',

  // Paywall & Conversion
  PAYWALL_SHOWN: 'paywall_shown',
  PAYWALL_DISMISSED: 'paywall_dismissed',
  UPGRADE_CLICKED: 'upgrade_clicked',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_CANCELLED: 'payment_cancelled',

  // Features
  MATH_MODAL_OPENED: 'math_modal_opened',
  TOOLTIP_HOVERED: 'tooltip_hovered',

  // Navigation
  DASHBOARD_VIEWED: 'dashboard_viewed',
  HISTORY_PAGE_VIEWED: 'history_page_viewed',
  CONTACT_PAGE_VIEWED: 'contact_page_viewed',
  ABOUT_PAGE_VIEWED: 'about_page_viewed',

  // Feedback
  FEEDBACK_SUBMITTED: 'feedback_submitted',
  FEEDBACK_BUTTON_OPENED: 'feedback_button_opened',
  FEEDBACK_BUTTON_CLOSED: 'feedback_button_closed',
}
