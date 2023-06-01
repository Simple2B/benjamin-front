import { CemeteriesService } from '@/openapi';
import { NextResponse } from 'next/server';

export async function GET() {
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //   });
  //const data = await res.json();

  return NextResponse.json({ msg: 'hello word' });
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  const cemeteryUuid = 'c3413048-7c32-4143-9f44-c74a6739ee0d';
  const cemetery =
    await CemeteriesService.getCemeteryApiCemeteryCemeteryUuidGet(cemeteryUuid);
  console.log(cemetery);

  //const data = await res.json();

  return NextResponse.json({ msg: ' post hello word' });
}
