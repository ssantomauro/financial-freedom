'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Alert } from '@/components/auth/Alert'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const type = searchParams.get('type')
    const tokenHash = searchParams.get('token_hash')

    if (type === 'signup' || type === 'email') {
      setStatus('success')
      setMessage('Your email has been verified successfully!')
    } else if (tokenHash) {
      // Email verification successful (handled by Supabase)
      setStatus('success')
      setMessage('Your email has been verified successfully!')
    } else {
      setStatus('error')
      setMessage('Invalid verification link')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-lg rounded-lg">
          {status === 'loading' && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6">
              <Alert type="success" message={message} />
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-gray-600">
                  You can now sign in to your account
                </p>
                <Link
                  href="/login"
                  className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <Alert type="error" message={message} />
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-gray-600">
                  The verification link may be invalid or expired
                </p>
                <Link
                  href="/signup"
                  className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign up again
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
