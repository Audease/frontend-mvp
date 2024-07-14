import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;
  const { pathname } = request.nextUrl;

  if (currentUser && !pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  if (!currentUser && !pathname.startsWith('/signIn') && !pathname.startsWith('/signup') && !pathname.startsWith('/forgotPassword')) {
    return Response.redirect(new URL('/signIn', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
