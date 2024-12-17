import { jwtDecode }from "jwt-decode";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export const useTokenManager = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
  
    const convertUnixTimestampToReadableDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const refreshAccessToken = async (refreshToken, baseUrl) => {
    try {
      const payload = { refreshToken };
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
        // Redirect to sign-in page if token refresh fails
        window.location.href = "/signIn";
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  if (accessToken) {
    const decoded = jwtDecode(accessToken);

    const expDate = convertUnixTimestampToReadableDate(decoded.exp);
    const iatDate = convertUnixTimestampToReadableDate(decoded.iat);

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTimeSeconds = decoded.exp - currentTime;

    const tokenInfo = {
      expDate,
      iatDate,
      remainingTimeSeconds,
    };

    if (remainingTimeSeconds < 300) {
      await refreshAccessToken(refreshToken, baseUrl);
    }

    return tokenInfo;
  }

  return null;
};
