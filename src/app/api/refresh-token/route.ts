import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  const accessToken = req.cookies.get("accessToken")?.value;
  console.log(`Refreh Token: ${refreshToken} \n Access Token: ${accessToken}`);


  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    console.log(decoded);
  
    const convertUnixTimestampToReadableDate = (timestamp) => {
      const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
      return date.toLocaleString(); // Use toLocaleString to get a human-readable format
    };
  
    const expDate = convertUnixTimestampToReadableDate(decoded.exp);
    const iatDate = convertUnixTimestampToReadableDate(decoded.iat);
  
    // Calculate the current time in Unix timestamp (seconds)
    const currentTime = Math.floor(Date.now() / 1000);
  
    // Calculate the remaining time until the token expires (in seconds)
    const remainingTimeSeconds = decoded.exp - currentTime;
  
    // Convert the remaining time to minutes
    const remainingTimeMinutes = remainingTimeSeconds / 60;

    if (!accessToken || remainingTimeSeconds < 10) {
      console.log("Access token cookie is missing.");
      return NextResponse.redirect(new URL('/signIn', req.url));
    }
  
    console.log("Issued at:", iatDate);
    console.log("Expires at:", expDate);
    console.log("Minutes left until token expires:", remainingTimeSeconds);
  }
  

  if (!refreshToken) {
    return new NextResponse(
      JSON.stringify({ message: "Refresh token missing" }),
      { status: 401 }
    );
  }

  try {
    const response = await axios.post(
      "https://audease-dev.onrender.com/v1/auth/refresh-token",
      {
        token: refreshToken,
      }
    );

    if (response.status === 200) {
      const { access } = response.data;

      const res = new NextResponse(
        JSON.stringify({ message: "Token refreshed" }),
        { status: 200 }
      );

      // Set the new access token
      cookies().set({
        name: "accessToken",
        value: access.token,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: access.expires,
        path: "/",
      });

      return res;
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Failed to refresh token" }),
        { status: response.status }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error.response?.data?.message || "Failed to refresh token",
      }),
      { status: error.response?.status || 500 }
    );
  }
}
