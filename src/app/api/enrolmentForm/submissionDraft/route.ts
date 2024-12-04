import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const { formType, data } = await req.json();

  // Get the access token from cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // Check if access token exists
  if (!accessToken) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized' }),
      { status: 401 }
    );
  }

  // Validate input
  if (!formType || !data) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid input: formType and data are required' }),
      { status: 400 }
    );
  }

  try {
    // Make the API call to form submissions endpoint
    const response = await axios.post(
      `${apiUrl}/v1/forms/submissions`,
      { formType, data }, 
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle successful response
    if (response.status === 201) {
      return new NextResponse(
        JSON.stringify({ 
          message: 'Form submitted successfully',
          data: response.data 
        }),
        { status: 201 }
      );
    } else {
      // Handle other successful status codes
      return new NextResponse(
        JSON.stringify({ 
          message: response.data.message || 'Form submission partially successful',
          data: response.data 
        }),
        { status: response.status },
      );
    }
  } catch (error) {
    // Handle axios error
    console.error('Form submission error:', error);

    return new NextResponse(
      JSON.stringify({ 
        message: error.response?.data?.message || 'Failed to submit form',
        error: error.response?.data || null
      }),
      { status: error.response?.status || 500 },
    );
  }
}