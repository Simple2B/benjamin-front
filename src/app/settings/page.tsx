import React from 'react';
import { ApiService } from '@/openapi';
import PreviewerSettings from '@/components/settings/PreviewerSettings';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60;

const Page = async () => {
  const settingsData = await ApiService.rootApiGet();

  return <PreviewerSettings settingsData={settingsData} />;
};

export default Page;
