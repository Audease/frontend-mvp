import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Extract any query parameters
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort") || "";

  let endpoint = "/v1/admin/roles";
  if (sort) {
    endpoint += `?sort=${sort}`;
  }

  try {
    const response = await fetch(apiUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Use no-store to prevent caching issues with filters
      next: { revalidate: 0 }, // Disable caching
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to get role options" },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to get role options" },
      { status: 500 }
    );
  }
}
