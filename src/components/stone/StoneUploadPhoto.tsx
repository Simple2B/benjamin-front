import React from 'react';

type IStoneUploadPhotoProps = {
  photoSrc?: string;
};

export const StoneUploadPhoto = ({ photoSrc }: IStoneUploadPhotoProps) => {
  return (
    <>
      <p className="leading-5 text-sm">Upload grave photo</p>
      <div className="">
        {photoSrc && (
          <img
            src={photoSrc}
            alt="stone"
            className="w-[244px] h-[320px] object-cover rounded-2xl"
          />
        )}
      </div>
    </>
  );
};
