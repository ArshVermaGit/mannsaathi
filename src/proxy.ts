import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuid } from 'uuid'

export default function proxy(request: NextRequest) {
  const response = NextResponse.next()
  
  // Create anonymous session if none exists
  if (!request.cookies.get('ms_session_id')) {
    const sessionId = uuid()
    response.cookies.set('ms_session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,  // 30 days
      path: '/'
    })
  }
  
  return response
}

export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, favicon
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
