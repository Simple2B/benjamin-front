'use client';
import React, { useState, useEffect } from 'react';
import MapCemetery from './MapCemetery';
import SearchBar from '../SearchBar';
import { redirect } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryInfo } from './cemeteryInfo';

export type ISolderPhotoGallery = {
  uuid: string;
  photoUrl: string;
  name: string;
};

export default function PreviewCemetery() {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const { currentCemetery } = useAppStore();

  if (!currentCemetery) {
    redirect(PATH.location);
  }

  return (
    <>
      <div className={`flex flex-col items-baseline w-full bg-white`}>
        <div className="fixed w-screen">
          <MapCemetery />
          <div className="flex flex-col items-center">
            <SearchBar
              setInputSoldier={setInputSoldier}
              displaySettings={true}
            />
          </div>
        </div>
      </div>
      <CemeteryInfo cemetery={currentCemetery} />
    </>
  );
}
