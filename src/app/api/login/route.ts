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
        permissions, user_id, learner_id, email, name, requires_password_change
      } = response.data;

      const responseData = { permissions, user_id, userEmail: email, userName: name, requires_password_change };
      if (learner_id) {
        responseData['learner_id'] = learner_id;
      }

      // Determine if we're in production/staging for cross-subdomain cookies
      const isProduction = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "staging";
      const cookieOptions = {
        domain: isProduction ? '.audease.co.uk' : undefined, // Don't set domain in dev
        secure: isProduction,
        httpOnly: true,
        path: '/',
        sameSite: "lax" as const, // Changed from "strict" to "lax"
      };

      // Set cookies BEFORE creating response
      const cookieStore = await cookies();
      
      cookieStore.set({
        ...cookieOptions,
        name: 'accessToken',
        value: access.token,
        maxAge: access.expires,
      });

      cookieStore.set({
        ...cookieOptions,
        name: 'refreshToken',
        value: refresh.token,
        maxAge: refresh.expires,
      });

      cookieStore.set({
        ...cookieOptions,
        name: 'permissions',
        value: JSON.stringify(permissions),
        maxAge: access.expires, // Tie to access token expiry
      });

      // Now create and return response
      return new NextResponse(JSON.stringify(responseData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: response.data.message || "Login failed" }),
        {
          status: response.status,
        }
      );
    }
  } catch (error: any) {
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