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
        permissions, user_id, learner_id, email, name,
      } = response.data;

      const responseData = { permissions, user_id, userEmail: email, userName: name };
      if (learner_id) {
        responseData['learner_id'] = learner_id;
      }

      const res = new NextResponse(JSON.stringify(responseData), {
        status: 200,
      });

      // Set accessToken cookie
      cookies().set({
        name: 'accessToken',
        value: access.token,
        secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV as string === "staging",
        httpOnly: true,
        maxAge: access.expires,
        path: '/',
        sameSite: "strict",
      });

      // Set refreshToken cookie
      cookies().set({
        name: 'refreshToken',
        value: refresh.token,
        secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV as string === "staging",
        httpOnly: true,
        maxAge: refresh.expires,
        path: '/',
        sameSite: "strict",
      });

      // Set permissions cookie
      cookies().set({
        name: 'permissions',
        value: JSON.stringify(permissions),
        secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV as string === "staging",
        httpOnly: true,
        path: '/',
        sameSite: "strict",
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
