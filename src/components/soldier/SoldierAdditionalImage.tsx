import React from 'react';
import Image from 'next/image';

type ISoldierAdditionalImageProps = {
  imageUrl: string;
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
        <Image
          src={imageUrl}
          width={318}
          height={215}
          alt="document"
          className="w-full h-[215] rounded-lg bg-grey-30"
        />
      </div>
    </>
  );
};

export default SoldierAdditionalImage;
