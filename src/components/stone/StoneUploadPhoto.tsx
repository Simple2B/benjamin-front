import React, { ChangeEvent, useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

type IStoneUploadPhotoProps = {
  setUploadedPhotoSrc: (photoSrc: string) => void;
  setPhotoUploaded: (arg: boolean) => void;
};

export const StoneUploadPhoto = ({
  setUploadedPhotoSrc,
  setPhotoUploaded,
}: IStoneUploadPhotoProps) => {
  const [photoSrc, setPhotoSrc] = useState<string | undefined>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        setPhotoUploaded(true);
        setPhotoSrc(image.src);
        setUploadedPhotoSrc(image.src);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    const fileInput = document.getElementById('hiddenFileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <>
      <p className="leading-5">Upload grave photo</p>
      <div className="mt-6">
        {photoSrc ? (
          <img
            src={photoSrc}
            alt="stone"
            className="w-[244px] h-[320px] object-cover"
          />
        ) : (
          <div className="w-[244px] h-[320px] bg-slate-300">
            <input
              type="file"
              id="hiddenFileInput"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button
              onClick={handleChooseFile}
              className="w-[244px] h-[320px] bg-grey-30"
            >
              <IconButton iconName={ICONS_NAME.upload} className="w-10 h-10" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
