import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const calculatorType = searchParams.get('calculatorType')

    if (!calculatorType) {
      return NextResponse.json(
        { error: 'Missing calculatorType parameter' },
        { status: 400 }
      )
    }

    // Get the user from database
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: {
        calculations: {
          where: {
            calculatorType,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      )
    }

    const MAX_FREE_CALCULATIONS = 3
    const calculationsUsed = dbUser.calculations.length
    const remainingCalculations = Math.max(0, MAX_FREE_CALCULATIONS - calculationsUsed)

    // Check if user has lifetime access
    if (dbUser.hasLifetimeAccess) {
      return NextResponse.json({
        canUse: true,
        hasLifetimeAccess: true,
        calculationsUsed,
        remainingCalculations: -1, // -1 means unlimited
        lastCalculation: dbUser.calculations[0] || null,
      })
    }

    // Check if user has remaining free calculations
    const canUse = remainingCalculations > 0

    return NextResponse.json({
      canUse,
      hasLifetimeAccess: false,
      calculationsUsed,
      remainingCalculations,
      lastCalculation: dbUser.calculations[0] || null,
    })
  } catch (error) {
    console.error('Check usage status error:', error)
    return NextResponse.json(
      { error: 'Failed to check usage status' },
      { status: 500 }
    )
  }
}
