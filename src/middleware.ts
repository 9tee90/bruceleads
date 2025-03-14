import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Public paths that don't require authentication
    const publicPaths = ['/', '/auth/login', '/auth/error', '/legal/privacy', '/legal/terms', '/dashboard'];
    const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

    // If the user is authenticated and tries to access auth pages (except home page),
    // redirect them to the dashboard
    if (req.nextauth.token && req.nextUrl.pathname === '/auth/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Allow access to public paths
    if (isPublicPath) {
      return NextResponse.next();
    }

    // For all other paths, require authentication
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes to apply the middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (home page)
     * - /legal (legal pages)
     * - /dashboard (temporarily public for demo)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|legal|dashboard|$).*)',
  ],
}; 