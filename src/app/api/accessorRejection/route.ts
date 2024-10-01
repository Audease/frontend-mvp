import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId'); 

  if (!studentId) {
    return NextResponse.json({ message: 'studentId is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      apiUrl +  `/v1/accessor/reject-application/${studentId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      return NextResponse.json({ status: 204 });
    } else {
      return NextResponse.json({ message: 'Rejection failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Rejection failed' }, { status: 500 });
  }
}
