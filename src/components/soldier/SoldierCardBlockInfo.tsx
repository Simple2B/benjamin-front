import React from 'react';
import { IDeath, Ilife, IMainInfo, IService } from './soldier.types';

type ISoldierCardBlockInfoProps = {
  solderInfo: IDeath | Ilife | IService | IMainInfo;
};

export const SoldierCardBlockInfo = ({
  solderInfo,
}: ISoldierCardBlockInfoProps) => {
  return (
    <>
      {Object.values(solderInfo).map(({ header, value }) => (
        <div key={header}>
          {value && (
            <div className="mt-3">
              <p className="text-sm text-grey-20 leading-7">{header}</p>
              <p className="font-medium leading-6 ">{value}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
