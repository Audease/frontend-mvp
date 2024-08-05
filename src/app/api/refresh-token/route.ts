import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  console.log(refreshToken);

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
