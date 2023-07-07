import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

type ISoldierCoordinates = {
  finalBurialCoordinates: (number | undefined)[];
  finalBurialLocation: string | undefined;
};

export const SoldierCoordinates = ({
  finalBurialCoordinates,
  finalBurialLocation,
}: ISoldierCoordinates) => {
  return (
    <>
      {finalBurialLocation && (
        <div className="w-[350px] p-4 bg-grey-10 rounded-lg flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm text-grey-20">Final burial location</p>
            <p className="leading-6">{finalBurialLocation}</p>
          </div>
          <div className="h-10 w-10 bg-indigo-100 flex justify-center items-center rounded-full">
            <IconButton
              iconName={ICONS_NAME.navigatorEdge}
              className={'h-6 w-6'}
            />
          </div>
        </div>
      )}
    </>
  );
};
