import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Extract the page and limit from the request query parameters
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1'; 
  const limit = searchParams.get('limit') || '10'; 
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || ''; 

  // Build the URL based on parameters
  let url = `/v1/admin/new-staff?page=${page}&limit=${limit}`;
  
  if (search) {
    url += `&search=${search}`;
  }
  
  if (status) {
    url += `&status=${status}`;
  }

  try {
    // Pass the page and limit in the request URL
    const response = await fetch(
      apiUrl + url,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        },
        cache: 'no-store', // Use no-store to prevent caching issues with filters
        next: { revalidate: 0 } // Disable caching
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to list staff' }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to list staff' }, { status: 500 });
  }
}