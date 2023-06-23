'use client';
import React, { useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { StoneUploadPhoto } from './StoneUploadPhoto';
import { SendPhotoForm } from './SendPhotoForm';
import moment from 'moment';
import { useAppStore } from '@/lib/slices/store';

type IStoneUploadWindowProps = {
  handleUploadWindowClose: () => void;
};

export const StoneUploadWindow = ({
  handleUploadWindowClose,
}: IStoneUploadWindowProps) => {
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isClosing, setClosing] = useState<boolean>(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string>();
  const { setCurrentStone } = useAppStore();

  const handleClose = () => {
    handleUploadWindowClose();
    setClosing(true);
  };

  const hadleUpload = () => {
    const validation = /\S+@\S+\.\S+/.test(email);
    setEmailValid(validation);
    if (validation && uploadedPhoto) {
      const uploadPhotoInfo = {
        date: moment().format('YYYY-MM-D'),
        sender: name,
        email: email,
        photoSrc: uploadedPhoto,
      };

      console.log(uploadPhotoInfo);
      setCurrentStone(uploadPhotoInfo);
      handleUploadWindowClose();
      setClosing(true);
    }
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
      <StoneUploadPhoto setUploadedPhoto={setUploadedPhoto} />
      <SendPhotoForm
        setEmail={setEmail}
        setName={setName}
        isEmailValid={isEmailValid}
      />

      <div className="w-full mt-[48px] justify-end flex px-8">
        <button
          className={`inline-flex items-center gap-x-2 p-3 rounded-lg justify-center font-semibold bg-turquoise-100 w-36 text-white`}
          onClick={hadleUpload}
        >
          <p className={`leading-6 font-semibold font-noto`}>Upload</p>
          <IconButton iconName={ICONS_NAME.arrowRigth} className={` h-4 w-4`} />
        </button>
      </div>
    </div>
  );
};
