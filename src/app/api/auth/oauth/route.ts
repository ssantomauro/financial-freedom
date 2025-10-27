import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { provider } = await request.json()

    if (!provider || !['google', 'apple'].includes(provider)) {
      return NextResponse.json(
        { error: 'Invalid provider' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const origin = request.headers.get('origin')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'apple',
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      url: data.url,
    })
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'An error occurred during OAuth' },
      { status: 500 }
    )
  }
}
