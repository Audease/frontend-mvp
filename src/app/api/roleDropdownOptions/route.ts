import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await axios.get(
      'https://backend-mvp-dev-4alpwwhpra-uc.a.run.app/v1/admin/roles',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
    //   console.log(response.data) 
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ message: response.data.message || 'Failed to get role options' }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.response?.data?.message || 'Failed to get role options' }, { status: error.response?.status || 500 });
  }
}
