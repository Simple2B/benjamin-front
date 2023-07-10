import { PreviewPrayer } from '@/components/prayer/PreviewPrayer';
import { SoldiersService } from '@/openapi';
import React from 'react';

export const fetchCache = 'default-cache';
export const revalidate = 60;

interface IPrayerPageProps {
  params: IPrayerParams;
}

interface IPrayerParams {
  soldierUuid: string;
}

const Page = async ({ params }: IPrayerPageProps) => {
  const { soldierUuid } = params;
  const soldier = await SoldiersService.getSoldier(soldierUuid);

  const { elMaleh } = soldier;

  return <PreviewPrayer elMaleh={elMaleh} />;
};

export default Page;
