import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function fetchDropdownOptions() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await axios.get(
      "https://audease-dev.onrender.com/v1/admin/roles",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
      // return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: response.data.message || "Failed to get role options" },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Failed to get role options",
      },
      { status: error.response?.status || 500 }
    );
  }
}


