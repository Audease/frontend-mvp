// app/api/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const response = await axios.post(
      "https://audease-dev.onrender.com/v1/auth/login",
      payload
    );
    if (response.status === 200) {
      const {
        token: { access, refresh },
      } = response.data;
      console.log(
        `"Access token": ${access.token} ${access.expires}, Refresh Token: ${refresh.token}, ${refresh.expires}`
      );

      const res = new NextResponse(
        JSON.stringify({ message: "Login Successful" }),
        {
          status: 200,
        }
      );

      // Set cookies
      res.cookies.set("accessToken", access.token, {
        httpOnly: true, // For security, prevent access from JavaScript
        secure: process.env.NODE_ENV === "production", // Set secure flag on production
        maxAge: access.expires, // Set expiration time
        path: "/",
      });

      res.cookies.set("refreshToken", refresh.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: refresh.expires,
        path: "/",
      });

      return res;
    } else {
      return new NextResponse(
        JSON.stringify({ message: response.data.message || "Login failed" }),
        {
          status: response.status,
        }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error.response?.data?.message || "Login failed",
      }),
      {
        status: error.response?.status || 500,
      }
    );
  }
}
