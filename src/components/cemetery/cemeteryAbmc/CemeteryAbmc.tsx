import React from 'react';
import { ABMC_LINK } from './CemeteryAbmc.constants';

export const CemeteryAbmc = () => {
  return (
    <div className="flex flex-col gap-6 items-center w-full px-6 z-10 bg-white pt-5 relative">
      <div className="w-full bg-grey-10 pt-3 px-4 pb-5 rounded-lg flex flex-col gap-3">
        <h2 className="font-semibold leading-6">About the ABMC</h2>
        <p className="leading-6">
          The American Battle Monuments Commission (ABMC) operates 26 permanent
          American burial grounds on foreign soil. There are 124,000 American
          war dead interred in these cemeteries.
        </p>
        <a href={ABMC_LINK} className=" text-blue font-semibold leading-6">
          Learn more
        </a>
      </div>{' '}
    </div>
  );
};
