import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const payload = await req.json();

//   console.log(payload)

  
  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await axios.post(
      apiUrl + '/v1/recruitment/create',
      payload, 
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 201 });
    } else {
      return NextResponse.json({ message: response.data.message || 'Failed to create learner' }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.response?.data?.message || 'Failed to create learner' }, { status: error.response?.status || 500 });
  }
}
