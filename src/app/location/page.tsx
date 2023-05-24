import React from 'react';
import { CemeteriesService } from '@/openapi';
import CemeteriesBox from '@/components/CemeteriesBox';

const Page = async () => {
  const cemeteries = await CemeteriesService.getCemeteriesApiCemeteryGet(
    1,
    1000
  );

  return (
    <div className="bg-gradient-to-r from-indigo-20 to-indigo-30 w-screen h-screen flex flex-col justify-start gap-10 p-4 items-end">
      <h1 className="text-xl leading-none text-white text-center mt-28">
        Which American military cemetery would you like to explore?
      </h1>
      <CemeteriesBox cemeteries={cemeteries} />
    </div>
  );
};

export default Page;
