import prisma from '@/lib/db/prisma'
import { User as SupabaseUser } from '@supabase/supabase-js'

/**
 * Sync a Supabase user to the local database
 * Call this after signup or first OAuth login
 */
export async function syncUserToDatabase(supabaseUser: SupabaseUser) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { supabaseId: supabaseUser.id },
    })

    if (existingUser) {
      // Update existing user
      return await prisma.user.update({
        where: { supabaseId: supabaseUser.id },
        data: {
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || existingUser.name,
          emailVerified: !!supabaseUser.email_confirmed_at,
          updatedAt: new Date(),
        },
      })
    }

    // Create new user
    const provider = supabaseUser.app_metadata?.provider || 'email'

    console.log('supabaseUser:', supabaseUser);
    return await prisma.user.create({
      data: {
        id: supabaseUser.id,
        supabaseId: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || null,
        emailVerified: !!supabaseUser.email_confirmed_at,
        provider,
      },
    })
  } catch (error) {
    console.error('Error syncing user to database:', error)
    throw error
  }
}

/**
 * Get user from database by Supabase ID
 */
export async function getUserFromDatabase(supabaseId: string) {
  return await prisma.user.findUnique({
    where: { supabaseId },
  })
}

/**
 * Get user from database by email
 */
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

/**
 * Delete user from database
 */
export async function deleteUserFromDatabase(supabaseId: string) {
  return await prisma.user.delete({
    where: { supabaseId },
  })
}
