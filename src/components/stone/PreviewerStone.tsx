'use client';
import React from 'react';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';
import { ICONS_NAME } from '../constants/iconName';
import HorizontalPhotoGallery from '../cemetery/HorizontalPhotoGallery';

export const PreviewerStone = () => {
  const router = useRouter();

  return (
    <>
      <div className="text-indigo-100 py-6 px-3 flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <div onClick={router.back}>
            <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-medium flex-grow text-center">
            Lay a stone
          </h1>
        </div>
        <div className="flex flex-col gap-3 px-3 ">
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
        <HorizontalPhotoGallery text="" solders={[]} className="z-0" />
      </div>
      <div className="fixed bottom-0 h-40 bg-gradient-to-t from-white to-transparent w-full flex justify-center items-end">
        <button className="w-10/12 bg-turquoise-100 text-white p-3 rounded-lg font-semibold m-3">
          Add headstone photo
        </button>
      </div>
    </>
  );
};
