import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
    })
  : null

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const user = await requireAuth()

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000'

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Financial Freedom - Lifetime Access',
              description: 'Unlimited calculations on all calculators, calculation history, and all future features',
              images: [`${origin}/logo.png`], // Add your logo URL
            },
            unit_amount: 490, // $4.90 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      customer_email: user.email,
      client_reference_id: user.id, // Store user ID for webhook
      metadata: {
        userId: user.id,
        userEmail: user.email || '',
        // Track payment initiated event on server side
        eventName: 'payment_initiated',
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      userId: user.id, // Send userId back for client-side tracking
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
