import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const accessToken = await TokenManager();
  const payload = await req.json();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`${apiUrl}/v1/admin/persona-staff`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "force-cache",
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || "Failed to retrieve staff list" },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to retrieve staff list" },
      { status: 500 }
    );
  }
}
