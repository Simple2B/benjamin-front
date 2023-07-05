import { IStone, PreviewerStone } from '@/components/stone/PreviewerStone';
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
  const stones = soldier.verifiedStones;

  const stonesWithUuid: IStone[] = stones.map(
    ({ created_at, senderName, photoUrl, senderEmail }) => {
      return { created_at, senderName, photoUrl, senderEmail, uuid: '' };
    }
  );

  return (
    <PreviewerStone stones={stonesWithUuid} soldierUuid={stoneSoldierUuid} />
  );
};

export default Page;
