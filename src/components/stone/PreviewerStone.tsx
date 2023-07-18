'use client';
import React, { useEffect, useState } from 'react';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';
import { ICONS_NAME } from '../constants/iconName';
import StoneHorizontalGallery from './StoneHorizontalGallery';
import { StoneUploadWindow } from './StoneUploadWindow';
import { useAppStore } from '@/lib/slices/store';
import Spinner from '../Spinner';
import { PREVIEWER_STONE_TEXT } from './previewerStone.constants';

export interface IStone {
  uuid: string;
  photoUrl: string;
  created_at: string;
  senderName?: string;
  senderEmail: string;
}

interface IStonePreviewerProps {
  stones: IStone[];
  soldierUuid: string;
}

export const PreviewerStone = ({
  stones,
  soldierUuid,
}: IStonePreviewerProps) => {
  const [isUploadWindowOpen, setUploadWindowOpen] = useState<boolean>(false);
  const [stonePhotosGallery, setStonePhotosGallery] =
    useState<IStone[]>(stones);
  const [isGallaryUpdating, setGallaryUpdating] = useState<boolean>(false);
  const [isRemoveComfirmWindowOpen, setRemoveComfirmWindowOpen] =
    useState<boolean>(false);

  const router = useRouter();
  const { currentStones } = useAppStore();

  useEffect(() => {
    const userUploadedPhoto = sessionStorage.getItem('uploadedStonePhoto');
    const userUploadedPhotoObj = JSON.parse(userUploadedPhoto || '{}');
    const stonesforSoldier = userUploadedPhotoObj[soldierUuid] || [];
    const allStones = [...stonesforSoldier, ...stones];

    const uniqueStones: IStone[] = allStones.filter(
      (stone, index, self) =>
        index === self.findIndex((s) => s.uuid === stone.uuid)
    );
    setStonePhotosGallery(uniqueStones);

    if (currentStones) {
      document.getElementById('page')?.scrollTo({
        top: window.screen.height,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [currentStones]);

  const handleUploadWindowClose = () => {
    const timer = setTimeout(() => {
      setUploadWindowOpen(false);
    }, 600);
    return () => clearTimeout(timer);
  };
  return (
    <>
      <div className="text-indigo-100 py-4 flex flex-col gap-8 mb-16">
        {isUploadWindowOpen && <div className="filter-indigo z-[100]" />}
        <div className="w-full flex justify-between px-[18px]">
          <div onClick={router.back}>
            <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-medium flex-grow text-center leading-5">
            Lay a stone
          </h1>
        </div>
        <div className="flex flex-col gap-3 px-8 leading-6">
          {PREVIEWER_STONE_TEXT.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        {!isRemoveComfirmWindowOpen && (
          <div className="fixed bottom-0 h-40 white-gradient w-full flex justify-center items-end z-10">
            <button
              className="w-[350px] bg-turquoise-100 text-white p-3 rounded-lg font-semibold m-3 mb-11"
              onClick={() => setUploadWindowOpen(true)}
            >
              Add headstone photo
            </button>
          </div>
        )}
        {isGallaryUpdating ? (
          <div className="w-full h-[144px] pb-4 -mt-3 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <StoneHorizontalGallery
            stonePhotosGallery={stonePhotosGallery}
            setStonePhotosGallery={setStonePhotosGallery}
            soldierUuid={soldierUuid}
            setRemoveComfirmWindowOpen={setRemoveComfirmWindowOpen}
          />
        )}
      </div>

      {isUploadWindowOpen && (
        <StoneUploadWindow
          handleUploadWindowClose={handleUploadWindowClose}
          soldierUuid={soldierUuid}
          setGallaryUpdating={setGallaryUpdating}
        />
      )}
    </>
  );
};
