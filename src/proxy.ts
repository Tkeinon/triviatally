import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const session = await auth()
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // If the user is logged in and trying to access an auth route, redirect to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If the user is not logged in and trying to access a protected route, redirect to login
  if (isDashboardRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
