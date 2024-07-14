// app/api/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const response = await axios.post(
      "https://audease-dev.onrender.com/v1/auth/login",
      payload
    );

    if (response.status === 200) {
      const { access, refresh } = response.data;

      if (!access?.token || !refresh?.token) {
        throw new Error("Tokens are undefined in the response");
      }

      const headers = new Headers();
      headers.append('Set-Cookie', `accessToken=${access.token}; HttpOnly; Secure; Path=/;`);
      headers.append('Set-Cookie', `refreshToken=${refresh.token}; HttpOnly; Secure; Path=/;`);

      return new NextResponse(JSON.stringify({ message: "Login Successful" }), { 
        status: 200, 
        headers 
      });
    } else {
      return new NextResponse(JSON.stringify({ message: response.data.message || "Login failed" }), { 
        status: response.status 
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.response?.data?.message || "Login failed" }), { 
      status: error.response?.status || 500 
    });
  }
}
