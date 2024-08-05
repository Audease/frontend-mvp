import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email } = await req.json(); // Adjust this according to your payload structure
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  console.log(accessToken);

  if (!accessToken) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401 }
    );
  }

  try {
    const response = await axios.post(
      'https://audease-dev.onrender.com/v1/admin/create-staff',
      { email }, // Adjust this according to your payload structure
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
