import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // If no tokens exist, session is invalid
    if (!accessToken && !refreshToken) {
      return NextResponse.json({ valid: false, reason: "no_tokens" }, { status: 401 });
    }

    // If we have an access token, check if it's valid
    if (accessToken) {
      try {
        const decoded: any = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Token is still valid
        if (decoded.exp > currentTime) {
          return NextResponse.json({ valid: true });
        }
      } catch (error) {
        console.error("Error decoding access token:", error);
      }
    }

    // Try to refresh the token
    if (refreshToken) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      try {
        const response = await fetch(`${baseUrl}/v1/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Set new access token
          cookies().set({
            name: "accessToken",
            value: data.token,
            secure:
              process.env.NODE_ENV === "production" ||
              (process.env.NODE_ENV as string) === "staging",
            httpOnly: true,
            maxAge: data.expires,
            path: "/",
            sameSite: "strict",
          });

          return NextResponse.json({ valid: true, refreshed: true });
        } else {
          // Refresh token is invalid, clear cookies
          cookies().delete("accessToken");
          cookies().delete("refreshToken");
          return NextResponse.json({ valid: false, reason: "refresh_failed" }, { status: 401 });
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        cookies().delete("accessToken");
        cookies().delete("refreshToken");
        return NextResponse.json({ valid: false, reason: "refresh_error" }, { status: 401 });
      }
    }

    return NextResponse.json({ valid: false, reason: "no_valid_token" }, { status: 401 });
  } catch (error) {
    console.error("Error checking session:", error);
    return NextResponse.json({ valid: false, reason: "server_error" }, { status: 500 });
  }
}
