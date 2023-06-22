import React, { ChangeEvent, useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

type IStoneUploadWindowProps = {
  handleUploadWindowClose: () => void;
};

export const StoneUploadWindow = ({
  handleUploadWindowClose,
}: IStoneUploadWindowProps) => {
  const [photo, setPhoto] = useState<HTMLImageElement>();
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  const handleSend = () => {
    setEmailValid(/\S+@\S+\.\S+/.test(email));
    if (isEmailValid) {
      console.log('sending');
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  return (
    <div className="fixed z-50 h-[838px] w-full bg-white flex flex-col items-center bottom-0 rounded-t-xl">
      <div
        className="flex justify-end mt-6 mb-4 w-full px-6"
        onClick={() => {
          handleUploadWindowClose();
        }}
      >
        <IconButton iconName={ICONS_NAME.cross} className="w-4 h-4" />
      </div>
      <p className="leading-5">Upload grave photo</p>
      <div className="mt-6">
        {photo ? (
          <img src="" alt="stone" className="w-[244px] h-[320px]" />
        ) : (
          <div className="w-[244px] h-[320px] bg-slate-300"></div>
        )}
      </div>
      <div className="flex flex-col w-full px-8 mt-8 gap-4">
        <div className="flex flex-col w-full">
          <h3 className="font-semibold leading-6">NAME</h3>
          <input
            type="email"
            id="email"
            className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px]"
            placeholder="Type your name"
          />
          <p className={`text-xs text-grey-20`}>Skip to stay anonymous</p>
        </div>
        <div className="flex flex-col w-full">
          <h3 className="font-semibold leading-6">EMAIL</h3>
          <input
            type="email"
            id="email"
            className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px]"
            placeholder="Type your email"
            onChange={handleEmail}
            required
          />
          <p className={`text-xs text-red-600 ${isEmailValid && 'invisible'}`}>
            Please enter accurate email address
          </p>
        </div>
      </div>
      <div className="w-full mt-[48px] justify-end flex px-8">
        <button
          className={`inline-flex items-center gap-x-2 p-3 rounded-lg justify-center font-semibold bg-turquoise-100 w-36 text-white`}
        >
          <p className={`leading-6 font-semibold font-noto`}>Upload</p>
          <IconButton iconName={ICONS_NAME.arrowRigth} className={` h-4 w-4`} />
        </button>
      </div>
    </div>
  );
};
