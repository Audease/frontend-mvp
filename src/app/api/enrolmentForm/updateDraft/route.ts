import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "submissionId is required" },
      { status: 400 }
    );
  }

  const { data } = await req.json();

  try {
    const response = await fetch(
      `${apiUrl}/v1/forms/submissions/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    if (response.ok) {
      return NextResponse.json(
        { message: "Application updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Update failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
