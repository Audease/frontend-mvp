// app/api/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const response = await axios.post(
      "https://audease-dev.onrender.com/v1/auth/login",
      payload
    );

    if (response.status === 200) {
      const { access, refresh } = response.data;

      if (!access?.token || !refresh?.token) {
        throw new Error("Tokens are undefined in the response");
      }

      const headers = new Headers();
      headers.append('Set-Cookie', `accessToken=${access.token}; HttpOnly; Secure; Path=/;`);
      headers.append('Set-Cookie', `refreshToken=${refresh.token}; HttpOnly; Secure; Path=/;`);

      return new NextResponse(JSON.stringify({ message: "Login Successful" }), { 
        status: 200, 
        headers 
      });
    } else {
      return new NextResponse(JSON.stringify({ message: response.data.message || "Login failed" }), { 
        status: response.status 
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.response?.data?.message || "Login failed" }), { 
      status: error.response?.status || 500 
    });
  }
}










import { NextRequest, NextResponse } from "next/server";

const middleware = async (request: NextRequest) => {
  const currentUser = request.cookies.get("currentUser")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  console.log("Current User Token:", currentUser);
  console.log("Refresh Token:", refreshToken);

  const { pathname } = request.nextUrl;

  function isTokenExpired(token: string) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  }

  // If the user is already logged in and is trying to access the login page, redirect to dashboard
  if (currentUser && pathname.startsWith("/signIn")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check if the access token is expired
  if (currentUser && isTokenExpired(currentUser)) {
    console.log("Access token expired. Attempting to refresh...");

    if (refreshToken) {
      try {
        const response = await fetch(
          "https://audease-dev.onrender.com/v1/auth/refresh-token", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }), // Use refreshToken here
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          const newAccessToken = data.token.access.token;
          const newRefreshToken = data.token.refresh.token;

          console.log("Tokens refreshed successfully.");

          // Set new tokens in cookies
          const res = NextResponse.next();
          res.cookies.set("currentUser", newAccessToken, {
            path: "/",
            maxAge: 14 * 24 * 60 * 60, // 14 days
          });
          res.cookies.set("refreshToken", newRefreshToken, {
            path: "/",
            maxAge: 14 * 24 * 60 * 60, // 14 days
          });

          return res;
        } else {
          console.log("Failed to refresh token. Redirecting to signIn.");
          return NextResponse.redirect(new URL("/signIn", request.url));
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.redirect(new URL("/signIn", request.url));
      }
    } else {
      console.log("No refresh token available. Redirecting to signIn.");
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  if (currentUser && !pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !currentUser &&
    !pathname.startsWith("/signIn") &&
    !pathname.startsWith("/signup") &&
    !pathname.startsWith("/forgotPassword") &&
    !pathname.startsWith("/reset-password")
  ) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/signIn"], // Apply middleware to both dashboard and signIn routes
};

export default middleware;
