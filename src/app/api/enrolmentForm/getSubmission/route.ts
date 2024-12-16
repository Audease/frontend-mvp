import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const learnerId = searchParams.get('learnerId'); 

  if (!learnerId) {
    return NextResponse.json({ message: 'learnerId is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${apiUrl}/v1/forms/submissions/${learnerId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("This response is okay")
      return NextResponse.json(data);
    } else {
      const errorData = await response.json();
      console.log("This response is not okay")
      return NextResponse.json({ message: 'Failed to fetch submissions', error: errorData }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch submissions', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}