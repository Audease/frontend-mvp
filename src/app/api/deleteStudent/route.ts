import { NextRequest, NextResponse } from 'next/server';
import { TokenManager } from '../utils/checkAndRefreshToken';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function DELETE(req: NextRequest) {
   const accessToken = await TokenManager()

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
      apiUrl +  `/v1/recruitment/students/${studentId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.ok) {
      return NextResponse.json({ status: 204 });
    } else {
      return NextResponse.json({ message: 'Failed to delete student' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete student' }, { status: 500 });
  }
}
