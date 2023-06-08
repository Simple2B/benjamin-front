import React from 'react';
import { ISoldierInfo } from './PreviewerSoldier';

type ISoldierCardBlockInfoProps = {
  solderInfo: ISoldierInfo[];
};

const SoldierCardBlockInfo = ({ solderInfo }: ISoldierCardBlockInfoProps) => {
  return (
    <>
      {solderInfo.map(({ criteriaName, criteriaValue }) => (
        <div key={criteriaName} className="mt-3">
          <p className="text-sm text-grey-20 leading-7">{criteriaName}</p>
          <p className="font-medium leading-6 ">{criteriaValue}</p>
        </div>
      ))}
    </>
  );
};

export default SoldierCardBlockInfo;
