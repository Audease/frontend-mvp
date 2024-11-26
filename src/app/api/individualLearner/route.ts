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
      `${apiUrl}/v1/admin/learners/${learnerId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.ok) {
      const learnerData = await response.json();
      return NextResponse.json(learnerData, { status: 200 });
    } else {
      return NextResponse.json({ 
        message: 'Failed to get learner info', 
        status: response.status 
      }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ 
      message: 'Failed to get learner info', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}