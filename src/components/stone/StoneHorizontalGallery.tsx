import React, { useTransition } from 'react';
import { IStone } from './PreviewerStone';
import { StoneProfile } from './StoneProfile/StoneProfile';
import { useAppStore } from '@/lib/slices/store';
import { deleteStonePhoto } from '@/app/actions';

type IStoneHorizontalGalleryProps = {
  stonePhotosGallery: IStone[];
  setStonePhotosGallery: (arg: IStone[]) => void;
};

export const StoneHorizontalGallery = ({
  stonePhotosGallery,
  setStonePhotosGallery,
}: IStoneHorizontalGalleryProps) => {
  const [isPending, startTransition] = useTransition();

  const { currentStones, setCurrentStone } = useAppStore();
  console.log(currentStones);

  const handleDelete = (deletingPhotoUuid: string) => {
    startTransition(() => deleteStonePhoto(deletingPhotoUuid));

    const filteredStones = stonePhotosGallery.filter(
      ({ created_at, senderName, photoUrl, senderEmail, uuid }) => {
        if (uuid !== deletingPhotoUuid) {
          return { created_at, senderName, photoUrl, senderEmail, uuid };
        }
      }
    );

    const filteredUploadedStones = currentStones?.filter(
      ({ created_at, senderName, photoUrl, senderEmail, uuid }) => {
        if (uuid !== deletingPhotoUuid) {
          return { created_at, senderName, photoUrl, senderEmail, uuid };
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
