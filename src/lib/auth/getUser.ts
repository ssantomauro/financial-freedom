import { createClient } from '@/lib/supabase/server'
import { User } from '@supabase/supabase-js'

/**
 * Get the current authenticated user on the server side
 * @returns User object or null if not authenticated
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

/**
 * Require authentication - throws error if user is not authenticated
 * @returns User object
 * @throws Error if user is not authenticated
 */
export async function requireUser(): Promise<User> {
  const user = await getUser()

  if (!user) {
    throw new Error('Authentication required')
  }

  return user
}

/**
 * Get user session
 */
export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}
