import { PreviewerStone } from '@/components/stone/PreviewerStone';
import { SoldiersService } from '@/openapi';
import React from 'react';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60;

interface IStonePageProps {
  params: IStoneParams;
}

interface IStoneParams {
  stoneSoldierUuid: string;
}

const Page = async ({ params }: IStonePageProps) => {
  const { stoneSoldierUuid } = params;

  const soldier = await SoldiersService.getSoldier(stoneSoldierUuid);
  console.log(soldier);

  return <PreviewerStone />;
};

export default Page;
