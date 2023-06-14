import React from 'react';
import { CemeteriesService } from '@/openapi';
import CemeteriesBox from '@/components/location/CemeteriesBox';

export const revalidate = 60;

const Page = async () => {
  const cemeteries = await CemeteriesService.getCemeteries();

  return <CemeteriesBox cemeteries={cemeteries.items} />;
};

export default Page;
