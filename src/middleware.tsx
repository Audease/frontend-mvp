import { NextRequest, NextResponse } from 'next/server';

const middleware = async (request: NextRequest) => {
  const currentUser = request.cookies.get('currentUser')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  function isTokenExpired(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }

  // If the user is already logged in and is trying to access the login page, redirect to dashboard
  if (currentUser && pathname.startsWith('/signIn')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check if the access token is expired
  if (currentUser && isTokenExpired(currentUser)) {
    if (refreshToken) {
      try {
        const response = await fetch('https://audease-dev.onrender.com/v1/auth/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken }),
        });

        if (response.status === 200) {
          const data = await response.json();
          const newAccessToken = data.token.access.token;
          const newRefreshToken = data.token.refresh.token;

          // Set new tokens in cookies
          const res = NextResponse.next();
          res.cookies.set('currentUser', newAccessToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days
          });
          res.cookies.set('refreshToken', newRefreshToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days
          });

          return res;
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

  if (currentUser && !pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!currentUser && !pathname.startsWith('/signIn') && !pathname.startsWith('/signup') && !pathname.startsWith('/forgotPassword') && !pathname.startsWith('/reset-password')) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard', '/signIn'], // Apply middleware to both dashboard and signIn routes
};

export default middleware;
