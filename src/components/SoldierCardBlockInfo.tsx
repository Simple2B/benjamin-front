import { IInfo } from '@/app/soldier/page';
import React from 'react';

type ISoldierCardBlockInfoProps = {
    info:IInfo[],
}

const SoldierCardBlockInfo = ({info}: ISoldierCardBlockInfoProps) => {
  return (
    <>
      { info.length &&
          info.map(({criteriaName, criteriaValue}) =>(
            <div key={criteriaName} className='mt-3'>
              <p className='text-sm text-grey-20'>{criteriaName}</p>
              <p className='font-medium'>{criteriaValue}</p>
            </div>
          ))
      }</>
  );
};

export default SoldierCardBlockInfo;
