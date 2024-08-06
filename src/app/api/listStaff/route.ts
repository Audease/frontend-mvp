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
      'https://audease-dev.onrender.com/v1/admin/staffs?page=1&limit=10',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      // console.log(response.data) 
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ message: response.data.message || 'Failed to list staff' }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.response?.data?.message || 'Failed to list staff' }, { status: error.response?.status || 500 });
  }
}
