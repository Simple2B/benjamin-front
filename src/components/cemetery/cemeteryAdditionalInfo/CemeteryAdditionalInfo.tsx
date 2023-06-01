import React from 'react';
import { ADDITONAL_INFO_HEADERS } from './CemeteryAdditionalInfo.constants';
import { ICemeteryAdditionalInfo } from './CemeteryAdditionalInfo.types';

const CemeteryAdditionalInfo = (props: ICemeteryAdditionalInfo) => {
  return (
    <div className="w-full bg-grey-10 p-4 rounded-lg">
      <h2 className="font-semibold leading-6">Additional info</h2>
      {Object.entries(props).map(([key, value]) => {
        return (
          <div key={key}>
            {value && (
              <div className="my-2">
                <p className="text-sm  text-grey-20 leading-7">
                  {ADDITONAL_INFO_HEADERS[key as keyof ICemeteryAdditionalInfo]}
                </p>
                <p className="text-base  text-indigo-100 font-medium leading-6">
                  {value}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CemeteryAdditionalInfo;
