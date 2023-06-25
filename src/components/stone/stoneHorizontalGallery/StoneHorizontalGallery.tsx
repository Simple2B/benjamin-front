import React from 'react';
import { IStone } from '../PreviewerStone';
import { StoneProfile } from '../StoneProfile/StoneProfile';
import { useAppStore } from '@/lib/slices/store';

type IStoneHorizontalGalleryProps = {
  stonePhotosGallery: IStone[];
  setStonePhotosGallery: (arg: IStone[]) => void;
};

export const StoneHorizontalGallery = ({
  stonePhotosGallery,
  setStonePhotosGallery,
}: IStoneHorizontalGalleryProps) => {
  const { currentStone, setCurrentStone } = useAppStore();

  const handleDelete = (deletingPhoto: string | undefined) => {
    const filteredStones = stonePhotosGallery.filter(
      ({ date, sender, photoSrc, email }) => {
        if (photoSrc !== deletingPhoto) {
          return { date, sender, photoSrc, email };
        }
      }
    );

    const filteredUploadedStones = currentStone?.filter(
      ({ date, sender, photoSrc, email }) => {
        if (photoSrc !== deletingPhoto) {
          return { date, sender, photoSrc, email };
        }
      }
    );

    setStonePhotosGallery(filteredStones);
    setCurrentStone(filteredUploadedStones ?? []);
  };

  return (
    <>
      {stonePhotosGallery.length ? (
        <div className="flex gap-4 overflow-x-auto pb-4 text-indigo-100 px-8 w-full whitespace-nowrap mb-16 -mt-3">
          {stonePhotosGallery.map((item, index) => (
            <StoneProfile item={item} handleDelete={handleDelete} key={index} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default StoneHorizontalGallery;
