import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Extract the page and limit from the request query parameters
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const certificateStatus = searchParams.get("certificate_status");
  const searchValue = searchParams.get("search") || "";

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (searchValue) {
    params.append("search", searchValue);
  }
  if (certificateStatus) {
    params.append("certificate_status", certificateStatus);
  }
  const url = `${apiUrl}/v1/certificate/students/filter?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: { tags: ["certificateLearnersList"] },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to list learners" },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to list learners" },
      { status: 500 }
    );
  }
}
