import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendNewUserNotification } from '@/lib/email/mailer'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to the frontend verification page
  return NextResponse.redirect(new URL(`/verify-email?token=${token}`, request.url))
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification link' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { token },
      })

      return NextResponse.json(
        { error: 'Verification link has expired. Please sign up again.' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 400 }
      )
    }

    // Update user's emailVerified field
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
      },
    })

    // Delete the verification token
    await prisma.verificationToken.delete({
      where: { token },
    })

    // Send admin notification (non-blocking)
    try {
      await sendNewUserNotification({
        email: user.email,
        name: user.name,
        signupMethod: 'Email/Password',
      })
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError)
      // Don't fail the verification if admin email fails to send
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed. Please try again.' },
      { status: 500 }
    )
  }
}
