import React from 'react';

type ISoldierHeadstonePhotoProps = { imageUrl: string };

export const SoldierHeadstonePhoto = ({
  imageUrl,
}: ISoldierHeadstonePhotoProps) => {
  return (
    <>
      <div className="mt-4 w-full">
        <p className="text-sm text-grey-20 mb-2">Headstone Photo</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Headstone"
            className="w-[158px] h-[222px] rounded-lg bg-grey-30 photo-shadow object-cover"
          />
        )}
      </div>
    </>
  );
};
