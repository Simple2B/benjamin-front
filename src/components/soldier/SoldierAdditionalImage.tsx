import React from 'react';
import Image from 'next/image';

type ISoldierAdditionalImageProps = {
  imageUrl: string | undefined;
  imageDescription: string;
};

const SoldierAdditionalImage = ({
  imageUrl,
  imageDescription,
}: ISoldierAdditionalImageProps) => {
  return (
    <>
      <div className="mt-3">
        <p className="text-sm text-grey-20 mb-3">{imageDescription}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="document"
            className="w-full h-[215] rounded-lg bg-grey-30"
          />
        )}
      </div>
    </>
  );
};

export default SoldierAdditionalImage;
