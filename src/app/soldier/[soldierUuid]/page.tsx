import PreviewerSoldier from '@/components/soldier/PreviewerSoldier/PreviewerSoldier';
import { SoldiersService } from '@/openapi';
import React from 'react';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60;

interface ISoldierPageProps {
  params: ISoldierParams;
}

interface ISoldierParams {
  soldierUuid: string;
}

const Page = async ({ params }: ISoldierPageProps) => {
  const { soldierUuid } = params;

  const soldier = await SoldiersService.getSoldier(soldierUuid);

  return <PreviewerSoldier soldier={soldier} />;
};

export default Page;
