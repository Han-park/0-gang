import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') || // exclude Next.js internals
    pathname.startsWith('/api') ||   // exclude API routes
    pathname.startsWith('/static') || // exclude static files
    PUBLIC_FILE.test(pathname)       // exclude files
  ) {
    return NextResponse.next();
  }

  // Check if the pathname starts with our supported languages
  if (!pathname.startsWith('/ko') && !pathname.startsWith('/en')) {
    // Redirect to default language (Korean)
    return NextResponse.redirect(new URL('/ko', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|image|favicon.ico).*)'],
}; 