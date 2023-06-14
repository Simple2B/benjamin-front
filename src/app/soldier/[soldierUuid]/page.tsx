import PreviewerSoldier from '@/components/soldier/PreviewerSoldier/PreviewerSoldier';
import React from 'react';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60;

interface ISoldierPageProps {
  params: ISoldierParams;
}

interface ISoldierParams {
  soldierryUuid: string;
}

const Page = async ({ params }: ISoldierPageProps) => {
  return <PreviewerSoldier />;
};

export default Page;
