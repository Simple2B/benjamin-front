import React from 'react';
import { ApiService, CemeteriesService } from '@/openapi';
import PreviewerSettings from '@/components/settings/PreviewerSettings';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-cache';
export const revalidate = 60;

const Page = async () => {
  const settingsData = await ApiService.rootApiGet();
  const cemeteries = await CemeteriesService.getCemeteries();

  return (
    <PreviewerSettings
      settingsData={settingsData}
      cemeteries={cemeteries.items}
    />
  );
};

export default Page;
