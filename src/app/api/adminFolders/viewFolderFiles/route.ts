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
  const folderId = searchParams.get("folderId") || "1";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";

  try {
    // Pass the page and limit in the request URL
    const response = await fetch(
      apiUrl + `/v1/admin/folders/${folderId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { tags: ["adminFileInFolder"] },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to fetch files in folder" },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch files in folder" },
      { status: 500 }
    );
  }
}
