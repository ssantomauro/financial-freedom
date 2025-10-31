'use client'

import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'
import { useSession } from 'next-auth/react'

export function AuthenticatedFeedbackButton() {
  const { trackEvent } = usePostHog()
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isLoading = status === 'loading'
  const user = session?.user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedback.trim() || !user) return

    setIsSubmitting(true)

    try {
      // Send feedback via email API
      const response = await fetch('/api/feedback/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback,
          page: window.location.pathname,
        }),
      })
console.log('response', response);
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send feedback')
      }

      // Track in PostHog for analytics
      trackEvent(AnalyticsEvents.FEEDBACK_SUBMITTED, {
        feedback_length: feedback.length,
        email: user?.email || 'anonymous',
        user_id: user?.id,
        user_name: user?.name || user?.email,
        page: window.location.pathname,
      })

      // Show success message
      setIsSubmitted(true)

      // Reset after 2 seconds
      setTimeout(() => {
        setIsOpen(false)
        setFeedback('')
        setIsSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      alert('Failed to send feedback. Please try again or contact support directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render if still loading or user is not authenticated
  if (isLoading || !user) return null

  return (
    <>
      {/* Floating Feedback Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            trackEvent(AnalyticsEvents.FEEDBACK_BUTTON_OPENED, {
              page: window.location.pathname,
            })
          }}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center gap-2 group"
          aria-label="Send Feedback"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Feedback
          </span>
        </button>
      )}

      {/* Feedback Form Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold">Send us your feedback</h3>
            </div>
            <button
              onClick={() => {
                setIsOpen(false)
                trackEvent(AnalyticsEvents.FEEDBACK_BUTTON_CLOSED, {
                  page: window.location.pathname,
                })
              }}
              className="hover:bg-white/20 rounded-full p-1 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* User Info Display */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Submitting as:</p>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || user?.email}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Feedback Input */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  What's on your mind?
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, report bugs, or suggest features..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Info text */}
              <p className="text-xs text-gray-500">
                Your feedback will be sent to our team via email. We'll respond to {user?.email} if needed.
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !feedback.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    trackEvent(AnalyticsEvents.FEEDBACK_BUTTON_CLOSED, {
                      page: window.location.pathname,
                    })
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Thank you!
              </h4>
              <p className="text-gray-600">
                Your feedback has been sent to our team.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
