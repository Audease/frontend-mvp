import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../../utils/checkAndRefreshToken";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "studentId is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      apiUrl + `/v1/forms/submissions/submit/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return NextResponse.json(
        { message: "Submission successful" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Submission failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Submission failed" }, { status: 500 });
  }
}
