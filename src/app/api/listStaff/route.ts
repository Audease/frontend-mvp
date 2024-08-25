import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(
      'https://backend-mvp-dev-4alpwwhpra-uc.a.run.app/v1/admin/new-staff?page=1&limit=100',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: {tags: ['stafflist'] } 
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