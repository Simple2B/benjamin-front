import React from 'react';
import { IStonePhotosGallery } from '../PreviewerStone';

import { StoneProfile } from '../StoneProfile';

type IStoneHorizontalGalleryProps = {
  stonePhotosGallery: IStonePhotosGallery[];
};

export const StoneHorizontalGallery = ({
  stonePhotosGallery,
}: IStoneHorizontalGalleryProps) => {
  return (
    <>
      {stonePhotosGallery.length ? (
        <div className="flex gap-4 overflow-x-auto pb-4 text-indigo-100 px-8 w-full whitespace-nowrap mb-16">
          {stonePhotosGallery.map(({ date, sender, photoSrc }, index) => (
            <StoneProfile
              date={date}
              sender={sender}
              photoSrc={photoSrc}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default StoneHorizontalGallery;
