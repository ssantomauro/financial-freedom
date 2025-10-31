import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: Request) {
  try {
    const user = await requireAuth()

    const { searchParams } = new URL(request.url)
    const calculatorType = searchParams.get('calculatorType')
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : undefined

    // Only allow lifetime subscribers to view history
    if (!user.hasLifetimeAccess) {
      return NextResponse.json(
        { error: 'This feature is only available for lifetime subscribers' },
        { status: 403 }
      )
    }

    // Fetch calculations with optional filter by calculator type and limit
    const calculations = await prisma.calculation.findMany({
      where: {
        userId: user.id,
        ...(calculatorType && { calculatorType }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        calculatorType: true,
        inputData: true,
        resultData: true,
        createdAt: true,
      },
      ...(limit && { take: limit }),
    })

    return NextResponse.json({
      calculations,
      total: calculations.length,
    })
  } catch (error) {
    console.error('Fetch calculation history error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calculation history' },
      { status: 500 }
    )
  }
}
