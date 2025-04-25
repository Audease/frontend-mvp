import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../../utils/checkAndRefreshToken";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json(
      { message: "learnerId is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${apiUrl}/v1/students/documents/${studentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const learnerData = await response.json();
      return NextResponse.json(learnerData, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message: "Failed to get learner info",
          status: response.status,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to get learner info",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
