import { createClient } from '@/lib/supabase/server'
import { syncUserToDatabase } from '@/lib/auth/syncUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const origin = request.headers.get('origin')

    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/api/auth/callback`,
        data: {
          name: name || null,
          full_name: name || null, // Supabase uses this for display name
        },
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Sync user to database
    if (data.user) {
      try {
        await syncUserToDatabase(data.user)
      } catch (syncError) {
        console.error('Failed to sync user to database:', syncError)
        // Don't fail the request if sync fails
      }
    }

    // Check if email confirmation is required
    if (data.user && !data.user.confirmed_at) {
      return NextResponse.json({
        message: 'Please check your email to confirm your account',
        requiresEmailVerification: true,
      })
    }

    return NextResponse.json({
      message: 'Account created successfully',
      user: data.user,
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
