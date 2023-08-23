'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';
import { ICONS_NAME } from '../constants/iconName';
import StoneHorizontalGallery from './StoneHorizontalGallery';
import { StoneUploadWindow } from './StoneUploadWindow';
import { useAppStore } from '@/lib/slices/store';
import Spinner from '../Spinner';
import { PREVIEWER_STONE_TEXT } from './previewerStone.constants';
import { UploadPhotoPopUpError } from './UploadPhotoPopUpError';

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
  const [photoSrc, setPhotoSrc] = useState<string | undefined>();
  const [uploadedPhotoForm, setUploadedPhotoForm] = useState<Blob>();

  const router = useRouter();
  const { currentStones, setCurrentSoldierScroll } = useAppStore();
  const [isPhotoError, setPhotoError] = useState<boolean>(false);

  useEffect(() => {
    if (isPhotoError) {
      setPhotoError(true);
      const timer = setTimeout(() => {
        setPhotoError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPhotoError]);

  useEffect(() => {
    setCurrentSoldierScroll(true);
  }, []);

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
  }, [currentStones]);

  const handleUploadWindowClose = () => {
    const timer = setTimeout(() => {
      setUploadWindowOpen(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      setPhotoError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      setPhotoSrc(image.src);
      setUploadedPhotoForm(file);
    };
    reader.readAsDataURL(file);
    setUploadWindowOpen(true);
  };

  const handleChooseFile = () => {
    const fileInput = document.getElementById('hiddenFileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleAddStoneButtonClick = () => {
    handleChooseFile();
  };
  return (
    <>
      <div className="text-indigo-100 pb-4 flex flex-col gap-8 mb-32">
        {isUploadWindowOpen && <div className="filter-indigo z-[100]" />}
        {isPhotoError && <UploadPhotoPopUpError />}
        <div className="top-0 w-full flex justify-between px-[18px] fixed bg-white py-3 pt-4">
          <div onClick={router.back}>
            <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-medium flex-grow text-center leading-5">
            Lay a stone
          </h1>
        </div>
        <div className="flex flex-col gap-3 px-8 leading-6 mt-16">
          {PREVIEWER_STONE_TEXT.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        {!isRemoveComfirmWindowOpen && (
          <div className="fixed bottom-0 h-40 white-gradient w-full flex justify-center items-end z-10">
            <input
              type="file"
              id="hiddenFileInput"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button
              className="w-[350px] bg-turquoise-100 text-white p-3 rounded-lg font-semibold m-3 mb-11"
              onClick={handleAddStoneButtonClick}
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
          photoSrc={photoSrc}
          uploadedPhotoForm={uploadedPhotoForm}
        />
      )}
    </>
  );
};
