import React from 'react';

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
      <div className="mt-4">
        <p className="text-sm text-grey-20 mb-2">{imageDescription}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="document"
            className="w-full h-[215px] rounded-lg bg-grey-30 photo-shadow object-cover"
          />
        )}
      </div>
    </>
  );
};

export default SoldierAdditionalImage;
