import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
   const isProduction = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "staging";
  
  const cookieOptions = {
    domain: isProduction ? '.audease.co.uk' : undefined,
    secure: isProduction,
    httpOnly: true,
    path: '/',
    expires: new Date(0), // Set to past date to delete
    maxAge: 0,
  };

  const cookieStore = await cookies();
  
  // Delete cookies with the same domain they were set with
  cookieStore.set({
    ...cookieOptions,
    name: 'accessToken',
    value: '',
  });

  cookieStore.set({
    ...cookieOptions,
    name: 'refreshToken',
    value: '',
  });

  cookieStore.set({
    ...cookieOptions,
    name: 'permissions',
    value: '',
  });

  return new NextResponse(
    JSON.stringify({ message: "Logout Successful" }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}