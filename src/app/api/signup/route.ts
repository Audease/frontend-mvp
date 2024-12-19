import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const newUser = await req.json();

  try {
    const response = await axios.post(apiUrl + "/v1/auth/signup", newUser);

    if (response.status === 201) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } else if (response.status === 409) {
      return NextResponse.json({ message: response.data }, { status: 409 });
    } else {
      return NextResponse.json(
        { message: response.data.message || "School creation failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Error creating school" },
      { status: error.response?.status || 500 }
    );
  }
}
