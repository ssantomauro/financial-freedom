import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
    const user = await requireAuth()

    const body = await request.json()
    const { calculatorType, inputData, resultData } = body

    if (!calculatorType || !inputData) {
      return NextResponse.json(
        { error: 'Missing required fields: calculatorType and inputData' },
        { status: 400 }
      )
    }

    // Save the calculation
    const calculation = await prisma.calculation.create({
      data: {
        userId: user.id,
        calculatorType,
        inputData,
        resultData: resultData || null,
      },
    })

    return NextResponse.json({
      success: true,
      calculation: {
        id: calculation.id,
        calculatorType: calculation.calculatorType,
        createdAt: calculation.createdAt,
      },
    })
  } catch (error) {
    console.error('Save calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to save calculation' },
      { status: 500 }
    )
  }
}
