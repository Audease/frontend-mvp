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
      console.log(`This is new: ${newAccessToken}`);

      const response = new NextResponse(
        JSON.stringify({ token: newAccessToken }),
        {
          status: 200,
        }
      );

      // Set the new access token in cookies
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 15 * 60, // 15 min
      });

      return response;
    } else {
      const errorData = await fetchResponse.json();
      return new NextResponse(
        JSON.stringify({ message: errorData.message || "Attempt failed" }),
        {
          status: fetchResponse.status,
        }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Attempt failed",
      }),
      {
        status: 500,
      }
    );
  }
}
