import React from 'react';
import { CemeteriesService } from '@/openapi';
import CemeteriesBox from '@/components/cemetery/CemeteriesBox';

const Page = async () => {
  const cemeteries = await CemeteriesService.getCemeteriesApiCemeteryGet();

  return <CemeteriesBox cemeteries={cemeteries} />;
};

export default Page;
