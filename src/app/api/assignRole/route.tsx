import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const payload = await req.json();

  console.log(accessToken)

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await axios.post(
      'https://backend-mvp-dev-4alpwwhpra-uc.a.run.app/v1/admin/staffs/assign-role',
      payload, 
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ message: response.data.message || 'Failed to assign role' }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.response?.data?.message || 'Failed to assign role' }, { status: error.response?.status || 500 });
  }
}
