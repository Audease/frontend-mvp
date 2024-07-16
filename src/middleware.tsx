import { NextRequest, NextResponse } from 'next/server';

const middleware = async (request: NextRequest) => {
  const currentUser = request.cookies.get('currentUser')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  function isTokenExpired(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }

  const res = NextResponse.next();

  // Check if the access token is expired
  if (currentUser && isTokenExpired(currentUser)) {
    if (refreshToken) {
      try {
        const response = await fetch(
          'https://audease-dev.onrender.com/v1/auth/refresh-token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.token.access.token;
          const newRefreshToken = data.token.refresh.token;

          // Set new tokens in cookies
          res.cookies.set('currentUser', newAccessToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
          });
          res.cookies.set('refreshToken', newRefreshToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
          });

          // Redirect back to the original path after refreshing token
          return NextResponse.redirect(request.url);
        } else {
          return NextResponse.redirect(new URL('/signIn', request.url));
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        return NextResponse.redirect(new URL('/signIn', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/signIn', request.url));
    }
  }

  // Redirect authenticated users away from non-dashboard pages to the dashboard
  if (currentUser && !pathname.startsWith('/dashboard') && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to the sign-in page unless they're accessing public routes
  if (!currentUser && !pathname.startsWith('/signIn') && !pathname.startsWith('/signup') && !pathname.startsWith('/forgotPassword') && !pathname.startsWith('/reset-password') && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  return res;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export default middleware;
