import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { CemeteriesService } from '@/openapi';

interface ISoldierSearchParams {
  cemeteryUuid?: string;
}

interface IContext {
  params: ISoldierSearchParams;
}

export async function GET(request: Request, context: IContext) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const page = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : undefined;
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : undefined;

  const { params } = context;
  if (!params.cemeteryUuid) {
    return NextResponse.json({ msg: 'specify cemetery uuid' });
  }

  const { cemeteryUuid } = params;

  const response =
    await CemeteriesService.getSoldiersApiCemeteryCemeteryUuidSoldierGet(
      cemeteryUuid,
      q,
      page,
      perPage
    );

  return NextResponse.json(response);
}
