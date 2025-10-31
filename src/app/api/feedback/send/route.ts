import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendFeedbackEmail } from '@/lib/email/mailer'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { feedback, page } = body

    if (!feedback || !feedback.trim()) {
      return NextResponse.json(
        { error: 'Feedback is required' },
        { status: 400 }
      )
    }

    // Validate environment variables
    if (!process.env.ADMIN_EMAIL) {
      console.error('ADMIN_EMAIL not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
      console.error('SMTP not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Send email
    await sendFeedbackEmail({
      userEmail: user.email || 'anonymous@example.com',
      userName: user.user_metadata?.name || user.email || 'Anonymous User',
      userId: user.id,
      feedback: feedback.trim(),
      page: page || '/',
    })

    return NextResponse.json({
      success: true,
      message: 'Feedback sent successfully',
    })
  } catch (error) {
    console.error('Failed to send feedback email:', error)
    return NextResponse.json(
      { error: 'Failed to send feedback' },
      { status: 500 }
    )
  }
}
