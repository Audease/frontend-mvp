// src/app/api/unarchiveRole/route.ts
import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const roleId = searchParams.get("roleId");

  if (!roleId) {
    return NextResponse.json(
      { message: "roleId is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      apiUrl + `/v1/admin/roles/${roleId}/unarchive`,
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
        { message: "Role unarchived successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to unarchive role" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to unarchive role" },
      { status: 500 }
    );
  }
}