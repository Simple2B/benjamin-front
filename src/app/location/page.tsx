import React from 'react';
import { CemeteriesService } from '@/openapi';
import CemeteriesBox from '@/components/cemetery/CemeteriesBox';

export const revalidate = 60;

const Page = async () => {
  const cemeteries = await CemeteriesService.getCemeteriesApiCemeteryGet();

  return <CemeteriesBox cemeteries={cemeteries} />;
};

export default Page;
