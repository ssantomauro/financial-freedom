import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

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
    const { calculatorType, inputData, resultData } = body

    if (!calculatorType || !inputData) {
      return NextResponse.json(
        { error: 'Missing required fields: calculatorType and inputData' },
        { status: 400 }
      )
    }

    // Get the user from database
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      )
    }

    // Save the calculation
    const calculation = await prisma.calculation.create({
      data: {
        userId: dbUser.id,
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
