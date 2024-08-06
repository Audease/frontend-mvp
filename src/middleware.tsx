import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;

  const decoded = jwtDecode(accessToken);
  console.log(decoded);

  const convertUnixTimestampToReadableDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleString(); // Use toLocaleString to get a human-readable format
  };

  const expDate = convertUnixTimestampToReadableDate(decoded.exp);
  const iatDate = convertUnixTimestampToReadableDate(decoded.iat);

  console.log("Issued at:", iatDate);
  console.log("Expires at:", expDate);

  // console.log(accessToken)
  const { pathname } = request.nextUrl;

  // if (!accessToken) {
  //   try {
  //     const refreshResponse = await axios.post(
  //       "/api/refresh-token",
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     if (refreshResponse.status === 200) {
  //       const { token } = refreshResponse.data;
  //       const response = NextResponse.next();
  //       response.cookies.set({
  //         name: "accessToken",
  //         value: token,
  //         secure: process.env.NODE_ENV === "production",
  //         httpOnly: true,
  //         maxAge: token.expires,
  //         path: "/",
  //       });

  //       // If we refresh the token, we should proceed to the requested page, not redirect again
  //       return response;
  //     }
  //     // else {
  //     //   return NextResponse.redirect(new URL("/signIn", request.url));
  //     // }
  //   } catch (error) {
  //     return NextResponse.redirect(new URL("/signIn", request.url));
  //   }
  // }

  if (accessToken) {
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

  return NextResponse.next();
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
