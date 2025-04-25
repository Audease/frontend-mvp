import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const fetchResponse = await fetch(
      apiUrl + "/v1/auth/refresh-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (fetchResponse.ok) {
      const responseData = await fetchResponse.json();
      const newAccessToken = responseData.token;
      return NextResponse.json({ token: newAccessToken }, { status: 200 });
    } else {
      const errorData = await fetchResponse.json();
      return NextResponse.json(
        { message: errorData.message || "Attempt failed" },
        { status: fetchResponse.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Attempt failed" },
      { status: 500 }
    );
  }
}