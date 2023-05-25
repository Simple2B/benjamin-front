import React from 'react';
import { ADDITONAL_INFO_HEADERS } from './cemeteryAdditionalInfo.constants';

type ICementryInfoProps = {
  superintendent: string;
  war: string;
  numberOfSoldiersBuried: number;
  numberOfJewishSoldiersBuried: number;
  listedAsMissingSoldiers: number;
};

const CemeteryAdditionalInfo = (props: ICementryInfoProps) => {
  return (
    <div className="w-full bg-grey-10 p-4 rounded-lg">
      <h2 className="font-semibold">Additional info</h2>
      {Object.entries(props).map(([key, value]) => {
        return (
          <>
            {value && (
              <div className="my-2" key={key}>
                <p className="text-sm  text-grey-20">
                  {ADDITONAL_INFO_HEADERS[key]}
                </p>
                <p className="text-base  text-indigo-100 font-medium">
                  {value}
                </p>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default CemeteryAdditionalInfo;
