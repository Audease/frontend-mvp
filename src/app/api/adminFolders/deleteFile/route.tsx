import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = await TokenManager();
  const documentId = searchParams.get("documentId") || "1";

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${apiUrl}/v1/admin/delete-document/${documentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to delete document" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete document", error: error.message },
      { status: 500 }
    );
  }
}
