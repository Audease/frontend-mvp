import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const response = await axios.post(
      apiUrl + "/v1/auth/login",
      payload
    );

    if (response.status === 200) {
      const {
        token: { access, refresh },
        permissions,
      } = response.data;

      const res = new NextResponse(JSON.stringify({ permissions }), {
        status: 200,
      });

      // Set accessToken cookie
      cookies().set({
        name: 'accessToken',
        value: access.token,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: access.expires,
        path: '/',
      });

      // Set refreshToken cookie
      cookies().set({
        name: 'refreshToken',
        value: refresh.token,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: refresh.expires,
        path: '/',
      });

      // Set permissions cookie
      cookies().set({
        name: 'permissions',
        value: JSON.stringify(permissions),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        path: '/',
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
