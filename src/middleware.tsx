import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const userPermisisons = request.cookies.get("permissions")?.value;
  console.log(`See permissions:  ${userPermisisons}`);
  // console.log("Middleware accessToken:", accessToken, "/n", "Middleware RefreshToken:", refreshToken);

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    console.log("Decoded token:", decoded);

    const convertUnixTimestampToReadableDate = (timestamp) => {
      const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
      return date.toLocaleString(); // Use toLocaleString to get a human-readable format
    };

    const expDate = convertUnixTimestampToReadableDate(decoded.exp);
    const iatDate = convertUnixTimestampToReadableDate(decoded.iat);

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTimeSeconds = decoded.exp - currentTime;
    const remainingTimeMinutes = remainingTimeSeconds / 60;

    console.log("Issued at:", iatDate);
    console.log("Expires at:", expDate);
    console.log("Minutes left until token expires:", remainingTimeSeconds);

    if (remainingTimeSeconds < 60) {
      console.log("Token expires soon");
      const refreshToken = request.cookies.get("refreshToken")?.value;

      const payload = { refreshToken };

      try {
        const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
        const response = await fetch(`${baseUrl}/api/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Token refreshed:", data);

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
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
  }

  const { pathname } = request.nextUrl;

  if (accessToken) {
    if (
      pathname.startsWith("/signIn") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgotPassword") ||
      pathname.startsWith("/reset-password")
    ) {
      if (userPermisisons) {
        const permissions = JSON.parse(userPermisisons);
        const adminPermissions = [
          "Add student",
          "Audit",
          "Induction",
          "Certificate",
          "Learning Platform",
          "Approve/reject application",
          "Send Application",
        ];

        if (permissions === "Add student") {
          return NextResponse.redirect(
            new URL("/recruiter-dashboard", request.url)
          );
        } else if (permissions === "Audit") {
          return NextResponse.redirect(
            new URL("/auditor-dashboard", request.url)
          );
        } else if (permissions === "Induction") {
          return NextResponse.redirect(
            new URL("/induction-dashboard", request.url)
          );
        } else if (permissions === "Certificate") {
          return NextResponse.redirect(
            new URL("/certificate-dashboard", request.url)
          );
        } else if (permissions === "Learning Platform") {
          return NextResponse.redirect(
            new URL("/learner-dashboard", request.url)
          );
        } else if (permissions === "Approve/reject application") {
          return NextResponse.redirect(
            new URL("/auditor-dashboard", request.url)
          );
        } else if (permissions === "Send Application") {
          return NextResponse.redirect(
            new URL("/bksd-dashboard", request.url)
          );
        } else if (permissions === adminPermissions) {
          return NextResponse.redirect(
            new URL("/dashboard", request.url)
          );
        }
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/signIn",
    "/signup",
    "/forgotPassword",
    "/reset-password",
    "/",
  ],
};

export default middleware;
