import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TokenManager } from "../utils/checkAndRefreshToken";

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
  const search = searchParams.get("search") || "";
  const application_status = searchParams.get("application_status") || "";

  try {
    // Pass the page and limit in the request URL
    const response = await fetch(
      apiUrl + `/v1/accessor/students?application_status=${application_status}&page=${page}&limit=${limit}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { tags: ["accessorLearnersList"] },
      }
    );

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
