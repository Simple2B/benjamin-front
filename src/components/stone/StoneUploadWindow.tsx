'use client';
import React, { useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { StoneUploadPhoto } from './StoneUploadPhoto';
import { SendPhotoForm } from './SendPhotoForm';
import moment from 'moment';
import { useAppStore } from '@/lib/slices/store';
import { IStone } from './PreviewerStone';

type IStoneUploadWindowProps = {
  handleUploadWindowClose: () => void;
};

export const StoneUploadWindow = ({
  handleUploadWindowClose,
}: IStoneUploadWindowProps) => {
  const [isClosing, setClosing] = useState<boolean>(false);

  const handleClose = () => {
    handleUploadWindowClose();
    setClosing(true);
  };

  return (
    <div
      className={`fixed z-50 h-[838px] w-full bg-white flex flex-col items-center
       bottom-0
      rounded-t-xl 
      ${isClosing ? 'upload-window-disappear' : 'upload-window-appear'}`}
    >
      <div
        className="flex justify-end mt-6 mb-4 w-full px-6"
        onClick={handleClose}
      >
        <IconButton iconName={ICONS_NAME.cross} className="w-4 h-4" />
      </div>
      <SendPhotoForm
        setClosing={setClosing}
        handleUploadWindowClose={handleUploadWindowClose}
      />
    </div>
  );
};
