'use client';
import React, { use, useEffect, useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { SendPhotoForm } from './SendPhotoForm';

type IStoneUploadWindowProps = {
  handleUploadWindowClose: () => void;
  soldierUuid: string;
  setGallaryUpdating: (value: boolean) => void;
  photoSrc: string | undefined;
  uploadedPhotoForm: Blob | undefined;
};

export const StoneUploadWindow = ({
  handleUploadWindowClose,
  soldierUuid,
  setGallaryUpdating,
  photoSrc,
  uploadedPhotoForm,
}: IStoneUploadWindowProps) => {
  const [isClosing, setClosing] = useState<boolean>(false);
  const [isPreviewSending, setPreviewSending] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleClose = () => {
    handleUploadWindowClose();
    setClosing(true);
  };

  return (
    <div
      className={`fixed z-[101] h-[90%] w-full bg-white flex flex-col items-center bottom-0 rounded-t-xl
      ${isPreviewSending && 'h-4/5'}
      ${isClosing ? 'upload-window-disappear' : 'upload-window-appear'}`}
    >
      <div
        className="flex justify-end mt-4 mb-4 w-full px-6 "
        onClick={handleClose}
      >
        <IconButton iconName={ICONS_NAME.cross} className="w-4 h-4 fixed" />
      </div>
      <SendPhotoForm
        setClosing={setClosing}
        handleUploadWindowClose={handleUploadWindowClose}
        soldierUuid={soldierUuid}
        setPreviewSending={setPreviewSending}
        setGallaryUpdating={setGallaryUpdating}
        photoSrc={photoSrc}
        uploadedPhotoForm={uploadedPhotoForm}
      />
    </div>
  );
};
