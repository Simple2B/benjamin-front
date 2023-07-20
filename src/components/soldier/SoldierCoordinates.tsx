import React from 'react';

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
        <div className="w-[350px] py-4 px-5 bg-grey-10 rounded-lg flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm text-grey-20">Final burial location</p>
            <p className="leading-6">{finalBurialLocation}</p>
          </div>
        </div>
      )}
    </>
  );
};
