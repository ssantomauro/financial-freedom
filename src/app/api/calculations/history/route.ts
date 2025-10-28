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
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : undefined

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

    // Only allow lifetime subscribers to view history
    if (!dbUser.hasLifetimeAccess) {
      return NextResponse.json(
        { error: 'This feature is only available for lifetime subscribers' },
        { status: 403 }
      )
    }

    // Fetch calculations with optional filter by calculator type and limit
    const calculations = await prisma.calculation.findMany({
      where: {
        userId: dbUser.id,
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
