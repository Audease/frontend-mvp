import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email } = await req.json(); 
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  // console.log(accessToken);

  if (!accessToken) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401 }
    );
  }

  try {
    const response = await axios.post(
      'https://backend-mvp-dev-4alpwwhpra-uc.a.run.app/v1/admin/create-staff',
      { email }, 
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return new NextResponse(
        JSON.stringify({ message: 'Staff created successfully' }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: response.data.message || 'Failed to create staff' }),
        { status: response.status },
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.response?.data?.message || 'Failed to create staff' }),
      { status: error.response?.status || 500 },
    );
  }
}
