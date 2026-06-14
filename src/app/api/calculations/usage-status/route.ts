import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: Request) {
  try {
    const user = await requireAuth()

    const { searchParams } = new URL(request.url)
    const calculatorType = searchParams.get('calculatorType')

    if (!calculatorType) {
      return NextResponse.json(
        { error: 'Missing calculatorType parameter' },
        { status: 400 }
      )
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        calculations: {
          where: { calculatorType },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    const calculationsUsed = dbUser?.calculations.length || 0

    return NextResponse.json({
      canUse: true,
      hasLifetimeAccess: true,
      calculationsUsed,
      remainingCalculations: -1,
      lastCalculation: dbUser?.calculations[0] || null,
    })
  } catch (error) {
    console.error('Check usage status error:', error)
    return NextResponse.json(
      { error: 'Failed to check usage status' },
      { status: 500 }
    )
  }
}
