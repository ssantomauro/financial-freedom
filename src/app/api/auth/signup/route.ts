import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendVerificationEmail, sendNewUserNotification } from '@/lib/email/mailer'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        emailVerified: null, // User needs to verify email
      },
    })

    // Create verification token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires: verificationExpires,
      },
    })

    // Send verification email
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const verificationUrl = `${origin}/api/auth/verify-email?token=${verificationToken}`

    try {
      await sendVerificationEmail({
        email,
        name: name || null,
        verificationUrl,
      })
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Don't fail the signup if email fails to send
    }

    // Send admin notification (non-blocking)
    try {
      await sendNewUserNotification({
        email,
        name: name || null,
        signupMethod: 'Email/Password',
      })
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError)
      // Don't fail the signup if admin email fails to send
    }

    return NextResponse.json({
      success: true,
      userId: user.id,
      message: 'Account created successfully. Please check your email to verify your account.',
      requiresEmailVerification: true,
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
