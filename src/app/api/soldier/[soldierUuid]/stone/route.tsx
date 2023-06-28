import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { CemeteriesService } from '@/openapi';
import { WatchDirectoryFlags } from 'typescript';

interface ISoldierStone {
  soldierUuid?: string;
}

interface IContext {
  params: ISoldierStone;
}

export async function POST(request: Request, context: IContext) {
  const { params } = context;
  if (!params.soldierUuid) {
    return NextResponse.json({ msg: 'specify soldier uuid' });
  }

  const { soldierUuid } = params;

  //   const response = await CemeteriesService.getCemeterySoldiers(
  //     soldierUuid,
  //     q,
  //     page,
  //     perPage
  //   );
  console.log(request.body);

  return NextResponse.json({ msg: 'hello world' });
}
