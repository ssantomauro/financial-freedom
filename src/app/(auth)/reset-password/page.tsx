'use client'

import { useState, FormEvent, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthInput } from '@/components/auth/AuthInput'
import { Alert } from '@/components/auth/Alert'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const isRecovery = type === 'recovery'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRequestReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        setEmail('')
      } else {
        setError(data.error || 'Failed to send reset email')
      }
    } catch (error) {
      console.error('Reset password error:', error)
      setError('An error occurred while sending reset email')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password updated successfully! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(data.error || 'Failed to update password')
      }
    } catch (error) {
      console.error('Update password error:', error)
      setError('An error occurred while updating password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRecovery ? 'Set new password' : 'Reset your password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRecovery ? (
              'Enter your new password below'
            ) : (
              <>
                Or{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  return to login
                </Link>
              </>
            )}
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

          {isRecovery ? (
            <form className="space-y-4" onSubmit={handleUpdatePassword}>
              <AuthInput
                label="New password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="At least 6 characters"
              />

              <AuthInput
                label="Confirm new password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Confirm your new password"
              />

              <AuthButton type="submit" isLoading={isLoading}>
                Update password
              </AuthButton>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRequestReset}>
              <p className="text-sm text-gray-600 mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <AuthInput
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
              />

              <AuthButton type="submit" isLoading={isLoading}>
                Send reset link
              </AuthButton>

              <div className="text-center mt-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}
