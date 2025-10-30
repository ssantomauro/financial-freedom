'use client'

import { useState, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthInput } from '@/components/auth/AuthInput'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import { Divider } from '@/components/auth/Divider'
import { Alert } from '@/components/auth/Alert'
import { usePostHog, AnalyticsEvents } from '@/lib/posthog/hooks'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { trackEvent, identifyUser } = usePostHog()

  useEffect(() => {
    // Track when user lands on login page
    trackEvent(AnalyticsEvents.LOGIN_STARTED)
  }, [trackEvent])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Track successful login
        trackEvent(AnalyticsEvents.LOGIN_COMPLETED, {
          email,
          login_method: 'email_password'
        })

        // Identify user if we have their ID
        if (data.userId) {
          identifyUser(data.userId, {
            email,
            last_login: new Date().toISOString()
          })
        }

        setSuccess('Login successful! Redirecting...')
        setTimeout(() => {
          router.push('/dashboard')
          router.refresh()
        }, 1000)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-lg rounded-lg">
          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} onClose={() => setError('')} />
            </div>
          )}

          {success && (
            <div className="mb-6">
              <Alert type="success" message={success} />
            </div>
          )}

          <OAuthButtons />

          <Divider />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <AuthInput
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />

            <AuthInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-end">
              <Link
                href="/reset-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>

            <AuthButton type="submit" isLoading={isLoading}>
              Sign in
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  )
}
