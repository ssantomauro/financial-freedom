import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

const protectedRoutes = ['/dashboard', '/calculators', '/history']
const authRoutes = ['/login', '/signup']
const publicRoutes = ['/', '/buy-vs-rent', '/reset-password']

export async function auth(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes (except protected ones)
  if (pathname.startsWith('/api/')) {
    const protectedApiRoutes = ['/api/calculations', '/api/feedback', '/api/stripe']
    const isProtectedApi = protectedApiRoutes.some(route => pathname.startsWith(route))

    if (!isProtectedApi) {
      return NextResponse.next()
    }
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname === route)

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if accessing auth pages while authenticated
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
