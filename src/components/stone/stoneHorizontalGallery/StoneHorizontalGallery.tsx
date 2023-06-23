import React from 'react';
import { IStonePhotosGallery } from '../PreviewerStone';
import IconButton from '@/components/IconButton';
import { ICONS_NAME } from '@/components/constants/iconName';
import { useAppStore } from '@/lib/slices/store';
import { formatDate } from './StoneHorizontalGallery.utils';

type IStoneHorizontalGalleryProps = {
  stonePhotosGallery: IStonePhotosGallery[];
  setStonePhotosGallery: (arg: IStonePhotosGallery[]) => void;
};

export const StoneHorizontalGallery = ({
  stonePhotosGallery,
  setStonePhotosGallery,
}: IStoneHorizontalGalleryProps) => {
  const { currentStone } = useAppStore();

  const handleDelete = (deletingPhoto: string | undefined) => {
    const filteredStones = stonePhotosGallery.filter(
      ({ date, sender, photoSrc }) => {
        if (photoSrc !== deletingPhoto) {
          return { date, sender, photoSrc };
        }
      }
    );
    setStonePhotosGallery(filteredStones);
  };

  const handleIsUploaded = (photoSrc: string | undefined) => {
    return currentStone?.find((stone) => {
      return stone.photoSrc == photoSrc;
    });
  };

  return (
    <>
      {stonePhotosGallery.length ? (
        <div className="flex gap-4 overflow-x-auto pb-4 text-indigo-100 px-8 w-full whitespace-nowrap mb-16 -mt-3">
          {stonePhotosGallery.map(({ date, sender, photoSrc }, index) => (
            <div className={`w-[148px] flex-shrink-0`} key={index}>
              <div className="w-full flex flex-col items-end">
                {handleIsUploaded(photoSrc) ? (
                  <div
                    className={`flex justify-center w-8 h-8 bg-indigo-100 items-center sticky top-4 -mr-2 rounded-full `}
                    onClick={() => handleDelete(photoSrc)}
                  >
                    <IconButton
                      iconName={ICONS_NAME.cross}
                      className="w-4 h-4 negative"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center w-8 h-8 items-center sticky top-4 -mr-2 rounded-full"></div>
                )}
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt="stone"
                    className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"
                  />
                ) : (
                  <div className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"></div>
                )}
              </div>

              <p className="text-xs text-center leading-6 mt-[6px]">
                {date ? formatDate(date) : ''}
              </p>
              <p className="text-xs text-center leading-6">
                {sender ? sender : 'Anonymous'}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default StoneHorizontalGallery;
