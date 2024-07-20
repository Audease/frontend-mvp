import { NextRequest, NextResponse } from "next/server";

const middleware = async (request: NextRequest) => {
  const currentUser = request.cookies.get("accessToken")?.value;
  console.log(currentUser)
  const { pathname } = request.nextUrl;

  if (currentUser) {
    // If the user is authenticated and trying to access auth-related routes, redirect them to the dashboard
    if (
      pathname.startsWith("/signIn") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgotPassword") ||
      pathname.startsWith("/reset-password")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    // If the user is not authenticated and trying to access protected routes, redirect them to signIn
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  return res;
};

export const config = {
  matcher: [
    "/dashboard/:path*", // Apply middleware to all paths under /dashboard
    "/signIn",
    "/signup",
    "/forgotPassword",
    "/reset-password",
    "/",
  ], // Apply middleware to relevant routes
};

export default middleware;
