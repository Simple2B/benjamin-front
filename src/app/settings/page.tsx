import React from 'react';
import { ApiService } from '@/openapi';
import PreviewerSettings from '@/components/PreviewerSettings';

export const dynamic = 'force-dynamic';
const Page = async () => {
  const settingsData = await ApiService.rootApiGet();

  return <PreviewerSettings settingsData={settingsData} />;
};

export default Page;
