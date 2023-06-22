import { PreviewerStone } from '@/components/stone/PreviewerStone';
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

export default function Page({ params }: IStonePageProps) {
  const { stoneSoldierUuid } = params;
  return <PreviewerStone />;
}
