import React from 'react';
import { CemeteriesService } from '@/openapi';
import CemeteriesBox from '@/components/cemetery/CemeteriesBox';

const Page = async () => {
  const cemeteries = await CemeteriesService.getCemeteriesApiCemeteryGet(
    1,
    1000
  );

  return (
    <div className="bg-gradient-to-r from-indigo-20 to-indigo-30 w-screen h-screen flex flex-col justify-start gap-8 px-8 items-center">
      <CemeteriesBox cemeteries={cemeteries} />
    </div>
  );
};

export default Page;
