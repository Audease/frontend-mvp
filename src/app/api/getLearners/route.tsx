import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Extract the page and limit from the request query parameters
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1'; 
  const limit = searchParams.get('limit') || '10'; 

  try {
    // Pass the page and limit in the request URL
    const response = await fetch(
      `https://backend-mvp-dev-535547563935.europe-west4.run.app/v1/admin/learners?page=${page}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: { tags: ['stafflist'] }, 
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to list learners' }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to list learners' }, { status: 500 });
  }
}
