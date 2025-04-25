// src/app/api/induction/sendInductionInvite/route.ts
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
    // Get request body and log it
    const requestBody = await req.text();
    console.log("Raw request body:", requestBody);
    
    // Parse JSON
    let payload;
    try {
      payload = JSON.parse(requestBody);
      console.log("Parsed payload:", payload);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return NextResponse.json(
        { message: "Invalid JSON payload" },
        { status: 400 }
      );
    }
    
    // Forward the exact payload to the backend
    const response = await fetch(
      apiUrl + `/v1/induction/students/${studentId}/inductor`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    // Get response body
    const responseBody = await response.text();
    console.log("Backend response:", response.status, responseBody);

    if (response.ok) {
      return NextResponse.json({ 
        status: 200,
        message: "Invite sent successfully" 
      });
    } else {
      return NextResponse.json(
        { 
          message: "Invite sending failed", 
          error: responseBody
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in invite API route:", error);
    return NextResponse.json(
      { 
        message: "Invite sending failed",
        error: error.toString()
      },
      { status: 500 }
    );
  }
}