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

  const birthMonth = searchParams.get('birth_month')
    ? Number(searchParams.get('birth_month'))
    : undefined;

  const birthYear = searchParams.get('birth_year')
    ? Number(searchParams.get('birth_year'))
    : undefined;

  const birthDay = searchParams.get('birth_day')
    ? Number(searchParams.get('birth_day'))
    : undefined;

  const deathMonth = searchParams.get('death_month')
    ? Number(searchParams.get('death_month'))
    : undefined;

  const deathYear = searchParams.get('death_year')
    ? Number(searchParams.get('death_year'))
    : undefined;
  const deathDate = searchParams.get('death_day')
    ? Number(searchParams.get('death_day'))
    : undefined;

  const birthLocation = searchParams.get('birth_location')
    ? searchParams.get('birth_location')
    : undefined;

  const isHeadstoneChanged = searchParams.get('is_headstone_changed')
    ? !!searchParams.get('is_headstone_changed')
    : undefined;

  const statesEnteredFrom =
    searchParams.get('states_entered_from') ?? undefined;

  console.log(statesEnteredFrom);

  const { params } = context;
  if (!params.cemeteryUuid) {
    return NextResponse.json({ msg: 'specify cemetery uuid' });
  }

  const { cemeteryUuid } = params;

  const response = await CemeteriesService.getCemeterySoldiers(
    cemeteryUuid,
    q,
    birthYear,
    birthMonth,
    birthDay,
    deathYear,
    deathMonth,
    deathDate,
    isHeadstoneChanged,
    statesEnteredFrom,
    birthLocation ? birthLocation : undefined
  );

  return NextResponse.json(response);
}
