import React from 'react';

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
        <p className="text-sm text-grey-20">{imageDescription}</p>
        <img
          className="w-full h-56 rounded-lg bg-grey-30"
          src={imageUrl}
          alt="document"
        />
      </div>
    </>
  );
};

export default SoldierAdditionalImage;
