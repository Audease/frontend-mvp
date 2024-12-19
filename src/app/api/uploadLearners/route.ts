import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawBody = await req.arrayBuffer();
    const contentType = req.headers.get("content-type") || "";

    const response = await fetch(apiUrl + "/v1/recruitment/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": contentType,
      },
      body: rawBody,
    }).catch((error) => {
      console.error("Fetch error:", error);
      throw new Error(`Fetch failed: ${error.message}`);
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const errorData = await response.text();
      console.error("API response error:", response.status, errorData);
      return NextResponse.json(
        { message: "Failed to upload sheet", error: errorData },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json(
      { message: "Failed to upload sheet", error: String(error) },
      { status: 500 }
    );
  }
}
