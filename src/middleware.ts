import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add public paths that don't require authentication
const publicPaths = ['/', '/privacy', '/terms'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to public paths without authentication
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Check for authentication for all other paths
  const token = request.cookies.get('next-auth.session-token');
  
  if (!token && !path.startsWith('/api/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 