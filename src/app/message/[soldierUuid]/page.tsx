import { PreviewerMessage } from '@/components/message/PreviewerMessage';
import React from 'react';

interface ISoldierPageProps {
  params: ISoldierParams;
}

interface ISoldierParams {
  soldierUuid: string;
}

export default function Page({ params }: ISoldierPageProps) {
  const { soldierUuid } = params;

  return <PreviewerMessage soldierUuid={soldierUuid} />;
}
