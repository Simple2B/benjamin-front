import React from 'react';

export const UploadPhotoPopUpError = () => {
  return (
    <div className="fixed w-full flex justify-center top-14">
      <div className=" w-[343px] h-[52px] bg-indigo-50 text-white flex items-center pl-4 rounded-lg z-[100]">
        <p className="leading-6 font-semibold">Unsupported file type</p>
      </div>
    </div>
  );
};
