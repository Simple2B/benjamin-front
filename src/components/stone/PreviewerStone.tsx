'use client';
import React, { useState } from 'react';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';
import { ICONS_NAME } from '../constants/iconName';
import HorizontalPhotoGallery from '../cemetery/HorizontalPhotoGallery';
import urlJoin from 'url-join';
import { AWS_BASE_URL } from '../constants/constants';
import StoneHorizontalGallery from './StoneHorizontalGallery';
import { StoneUploadWindow } from './StoneUploadWindow';

export interface IStonePhotosGallery {
  date: string;
  sender: string;
  photo: string;
}

export const PreviewerStone = () => {
  const [isUploadWindowOpen, setUploadWindowOpen] = useState<boolean>(false);
  const router = useRouter();

  const stonePhotosGallery: IStonePhotosGallery[] = [
    {
      date: 'January 30th, 2020',
      sender: 'Daniel Katz',
      photo: '/images/photos/stonePhoto.jpg',
    },
    {
      date: 'May 14th, 2020',
      sender: 'LA',
      photo: '/images/photos/stonePhoto.jpg',
    },
    {
      date: 'July 28th, 2020',
      sender: 'John',
      photo: '',
    },
    {
      date: 'September 1th, 2020',
      sender: 'Marta',
      photo: '/images/photos/stonePhoto.jpg',
    },
  ];

  const handleUploadWindowClose = () => {
    setUploadWindowOpen(false);
  };

  return (
    <>
      <div className="text-indigo-100 py-4 flex flex-col gap-8">
        <div className="w-full flex justify-between px-[18px]">
          <div onClick={router.back}>
            <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-medium flex-grow text-center leading-5">
            Lay a stone
          </h1>
        </div>
        <div className="flex flex-col gap-3 px-8 leading-6">
          <p>
            Jews traditionally mark a visit to a grave with the laying of a
            small stone on the grave or headstone. By visiting an ancestor or
            person of importance in our lives, we try to make their memory last.
            Flowers are a good metaphor for the brevity of life, but stones seem
            better suited to the permanence of memory. Stones do not die, and
            Jews have a famously long memory.
          </p>
          <p>
            An intriguing explanation for the laying of stones refers to the
            inscription on many Jewish gravestones. The Hebrew abbreviation taf,
            nun, tsadi, bet, hey stands for “teheye nishmato tsrurah b’tsror ha-
            chayyim,” a phrase usually translated as “May his soul be bound up
            in the bonds of eternal life.”
          </p>
          <p>
            Tsror also mean a stone, in Hebrew. The placing of a stone might be
            an affirmation of the wishes that the departed be enveloped in the
            bonds of eternal life.
          </p>
        </div>
        <StoneHorizontalGallery stonePhotosGallery={stonePhotosGallery} />
      </div>
      <div
        className="fixed bottom-0 h-40 bg-gradient-to-t from-white to-transparent w-full flex justify-center items-end"
        onClick={() => setUploadWindowOpen(true)}
      >
        <button className="w-[350px] bg-turquoise-100 text-white p-3 rounded-lg font-semibold m-3 mb-11">
          Add headstone photo
        </button>
      </div>
      {isUploadWindowOpen && (
        <StoneUploadWindow handleUploadWindowClose={handleUploadWindowClose} />
      )}
    </>
  );
};
