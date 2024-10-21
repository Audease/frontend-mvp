import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;
  const permissionsCookie = cookies().get('permissions')?.value;
  const { pathname } = request.nextUrl;
  let userPermissions = [];
  if (permissionsCookie) {
    userPermissions = JSON.parse(permissionsCookie);
  }

  if (accessToken) {
    const decoded = jwtDecode(accessToken);

    const convertUnixTimestampToReadableDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    };

    const expDate = convertUnixTimestampToReadableDate(decoded.exp);
    const iatDate = convertUnixTimestampToReadableDate(decoded.iat);

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTimeSeconds = decoded.exp - currentTime;

    if (remainingTimeSeconds < 300) {
      const refreshToken = request.cookies.get("refreshToken")?.value;

      const payload = { refreshToken };

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          `${request.nextUrl.protocol}//${request.nextUrl.host}`;
        const response = await fetch(`${baseUrl}/api/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();

          const newAccessToken = data.token;
          const res = NextResponse.next();
          res.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: newAccessToken.expires,
          });
          return res;
        } else {
          console.error("Error refreshing token:", response.statusText);
          NextResponse.redirect(new URL("/signIn", request.url));
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
  }

  

  if (userPermissions.length > 0) {
    if (
      pathname.startsWith("/signIn") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgotPassword") ||
      pathname.startsWith("/reset-password")
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

     // Recruiter screen access permission
     if (
      pathname.startsWith("/recruiter-dashboard") &&
      !userPermissions.includes("Add student")
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    // Accessor screen access permission
    if (
      pathname.startsWith("/accessor-dashboard") &&
      !userPermissions.includes("Approve/reject application")
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    // Auditor screen access permission
    if (
      pathname.startsWith("/auditor-dashboard") &&
      !userPermissions.includes("Audit")
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    // BKSD screen access permission
    if (
      pathname.startsWith("/bksd-dashboard") &&
      !userPermissions.includes("Send Application")
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    // Certificate screen access permission
    if (
      pathname.startsWith("/certificate-dashboard") &&
      !userPermissions.includes("Certificate")
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    // Induction screen access permission
    if (
      pathname.startsWith("/induction-dashboard") &&
      !userPermissions.includes("Induction")
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    // Lazer screen access permission
    if (
      pathname.startsWith("/lazer-dashboard") &&
      !userPermissions.includes("Learning Platform")
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }

    // Admin screen access permission
    if (
      pathname.startsWith("/admin/") &&
      userPermissions.length < 4
    ) {
      return NextResponse.redirect(new URL("/no-access", request.url));
    }
  } else {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/recruiter-dashboard") ||
      pathname.startsWith("/accessor-dashboard") ||
      pathname.startsWith("/auditor-dashboard") ||
      pathname.startsWith("/bksd-dashboard") ||
      pathname.startsWith("/certificate-dashboard") ||
      pathname.startsWith("/induction-dashboard") ||
      pathname.startsWith("/lazer-dashboard") ||
      pathname.startsWith("/admin/")
    ) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin/:path*",
    "/recruiter-dashboard/",
    "/accessor-dashboard/",
    "/auditor-dashboard/:path*",
    "/bksd-dashboard",
    "/certificate-dashboard",
    "/induction-dashboard",
    "/lazer-dashboard",
    "/signIn",
    "/signup",
    "/forgotPassword",
    "/reset-password",
    "/",
  ],
};

export default middleware;
