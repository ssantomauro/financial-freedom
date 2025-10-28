import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

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

    // Only allow lifetime subscribers to view calculation details
    if (!dbUser.hasLifetimeAccess) {
      return NextResponse.json(
        { error: 'This feature is only available for lifetime subscribers' },
        { status: 403 }
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
