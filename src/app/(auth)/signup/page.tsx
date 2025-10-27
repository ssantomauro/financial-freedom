'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthInput } from '@/components/auth/AuthInput'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import { Divider } from '@/components/auth/Divider'
import { Alert } from '@/components/auth/Alert'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [requiresVerification, setRequiresVerification] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.requiresEmailVerification) {
          setRequiresVerification(true)
          setSuccess(data.message)
        } else {
          setSuccess('Account created successfully! Redirecting...')
          setTimeout(() => {
            router.push('/')
            router.refresh()
          }, 1500)
        }
      } else {
        setError(data.error || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('An error occurred during signup')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
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

          {!requiresVerification && (
            <>
              <OAuthButtons />

              <Divider />

              <form className="space-y-4" onSubmit={handleSubmit}>
                <AuthInput
                  label="Full name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="John Doe"
                />

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
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                />

                <AuthInput
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                />

                <AuthButton type="submit" isLoading={isLoading}>
                  Create account
                </AuthButton>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </>
          )}

          {requiresVerification && (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                We've sent a verification email to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Please check your inbox and click the verification link to activate your account.
              </p>
              <Link href="/login" className="inline-block mt-4 text-blue-600 hover:text-blue-500">
                Return to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
