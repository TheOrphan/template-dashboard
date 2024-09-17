import { NextRequest, NextResponse } from 'next/server';
import { optionsAppJson } from '@/utils/server.helpers';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const size = searchParams.get('size');
  const page = searchParams.get('page');
  const name = searchParams.get('name');

  const params = [];
  if (size) params.push(`size=${size}`);
  if (page) params.push(`page=${page}`);
  if (name) params.push(`name=${name}`);

  let paramsString = '';
  if (params.length > 0) paramsString = `?${params.join('&')}`;
  const urlUserManagement = `${process.env.NEXT_API_URL}/user-employee/all${paramsString}`;
  const urlGuestSearch = `${process.env.NEXT_API_URL}/user-employee/name${paramsString}&sort=name,asc`;
  const urlFix = name ? urlGuestSearch : urlUserManagement;
  try {
    const res = await fetch(`${urlFix}`, {
      method: 'GET',
      headers: (await optionsAppJson()).headers,
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as string).toString() }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    const resBody = await request.json();
    const urlCreateUser = `${process.env.NEXT_API_URL}/user-employee/update/${employeeId}`;

    const res = await fetch(`${urlCreateUser}`, {
      method: 'PATCH',
      headers: (await optionsAppJson()).headers,
      body: JSON.stringify(resBody),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
    return NextResponse.json('Terjadi kesalahan', { status: 500 });
  }
}
