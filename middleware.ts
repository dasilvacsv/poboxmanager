import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is trying to access dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // In a real app, you'd check for a valid session/token
    // For demo purposes, we'll just check localStorage on the client side
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
}
