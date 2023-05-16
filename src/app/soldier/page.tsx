import SoldierMainInfoCard from '@/components/SoldierMainInfoCard';
import React from 'react';

export default function Page() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <SoldierMainInfoCard photoUrL='#' name='1st Lt. Robert Fink' serviceNumber='O-430368' branchOfService='US Coast Guard' awards='Purple Heart' />
    </div>
  );
}

