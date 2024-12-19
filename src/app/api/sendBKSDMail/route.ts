import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json(
      { message: "studentId is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(apiUrl + `/v1/bksd/send-mail/${studentId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return NextResponse.json({ status: 204 });
    } else {
      return NextResponse.json(
        { message: "Application sending failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Application sending failed" },
      { status: 500 }
    );
  }
}
