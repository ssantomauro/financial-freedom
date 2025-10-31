import { auth } from "@/app/api/auth/[...nextauth]/route"

/**
 * Get the current authenticated user on the server side
 * @returns User object or null if not authenticated
 */
export async function getUser() {
  const session = await auth()
  return session?.user || null
}

/**
 * Require authentication - throws error if user is not authenticated
 * @returns User object
 * @throws Error if user is not authenticated
 */
export async function requireUser() {
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
  return await auth()
}
