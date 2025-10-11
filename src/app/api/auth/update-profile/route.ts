import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await req.json();

    const response = await fetch(
      `${apiUrl}/v1/auth/edit-profile`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      return NextResponse.json(
        { message: "Profile updated successfully" },
        { status: 200 }
      );
    } else {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to update profile" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}