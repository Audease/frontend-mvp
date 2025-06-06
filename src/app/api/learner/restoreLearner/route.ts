// src/app/api/learner/restoreLearner/route.ts
import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../../utils/checkAndRefreshToken";

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
    const response = await fetch(
      apiUrl + `/v1/archive/students/${studentId}/restore`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        },
      }
    );

    if (response.ok) {
      return NextResponse.json({ status: 200, message: "Learner restored successfully" });
    } else {
      return NextResponse.json(
        { message: "Restore operation failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Restore operation failed" },
      { status: 500 }
    );
  }
}