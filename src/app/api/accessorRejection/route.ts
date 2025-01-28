import { NextRequest, NextResponse } from 'next/server';
import { TokenManager } from '../utils/checkAndRefreshToken';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ message: 'studentId is required' }, { status: 400 });
  }

  const { reason } = await req.json();

  try {
    const response = await fetch(
      `${apiUrl}/v1/accessor/reject-application/${studentId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ message: 'Application rejected successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Rejection failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Rejection failed' }, { status: 500 });
  }
}