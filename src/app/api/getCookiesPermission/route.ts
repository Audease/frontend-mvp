import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const permissionsCookie = cookies().get('permissions');
//   console.log(permissionsCookie)
  const permissions = permissionsCookie ? JSON.parse(permissionsCookie.value) : [];

  return NextResponse.json({ permissions });
}
