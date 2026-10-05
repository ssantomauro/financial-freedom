import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    const { id } = await params

    // Get the user from database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      )
    }

    // Fetch the calculation
    const calculation = await prisma.calculation.findUnique({
      where: {
        id,
        userId: dbUser.id, // Ensure user owns this calculation
      },
    })

    if (!calculation) {
      return NextResponse.json(
        { error: 'Calculation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      calculation,
    })
  } catch (error) {
    console.error('Fetch calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calculation' },
      { status: 500 }
    )
  }
}
