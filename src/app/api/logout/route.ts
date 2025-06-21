import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = new NextResponse(
    JSON.stringify({ message: "Logout Successful" }),
    {
      status: 200,
    }
  );

  

  res.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), 
    path: "/",
  });

  res.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), 
    path: "/",
  });

  res.cookies.set("permissions", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), 
    path: "/",
  });

  return res;
}
