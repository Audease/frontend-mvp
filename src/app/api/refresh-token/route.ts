import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const axiosResponse = await axios.post(
      "https://audease-dev.onrender.com/v1/auth/refresh-token",
      payload
    );

    if (axiosResponse.status === 200) {
      const newAccessToken = axiosResponse.data.token;
      console.log(`This is new: ${newAccessToken}`);

      const response = new NextResponse(
        JSON.stringify({ token: `${newAccessToken}` }),
        {
          status: 200,
        }
      );

      // Set the new access token in cookies
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        maxAge: 12 * 60 * 60, // 12 hours
      });

      return response;
    } else {
      return new NextResponse(
        JSON.stringify({ message: axiosResponse.data.message || "Attempt failed" }),
        {
          status: axiosResponse.status,
        }
      );
    }
  } catch (error) {
    // Handle cases where `error.response` might be undefined
    return new NextResponse(
      JSON.stringify({
        message: (error as any).response?.data?.message || "Attempt failed",
      }),
      {
        status: (error as any).response?.status || 500,
      }
    );
  }
}
