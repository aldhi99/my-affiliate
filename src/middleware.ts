import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login';

  // Get the token from the cookies
  const token = request.cookies.get('adminToken')?.value || '';

  // Check if the path is an admin route
  const isAdminRoute = path.startsWith('/admin');

  // If user is logged in and tries to access login page, redirect to admin dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If user is not logged in and tries to access admin route, redirect to login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/login',
    '/admin/:path*'
  ]
}; 