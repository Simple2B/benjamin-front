'use client';
import React, { useState, useEffect } from 'react';
import { CemeteryOut } from '@/openapi';
import MapCemetery from './MapCemetery';
import SearchBar from '../SearchBar';
import SelectingCemetery from '../SelectingCementery';
import { useRouter } from 'next/navigation';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryInfo } from './cemeteryInfo';

interface CemeteryPageProps {
  cemetery: CemeteryOut;
  cemeteries: Array<CemeteryOut>;
}

export type ISolderPhotoGallery = {
  uuid: string;
  photoUrl: string;
  name: string;
};

export default function PreviewCemetery({
  cemetery,
  cemeteries,
}: CemeteryPageProps) {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const [isSelectingOpen, setSelectingOpen] = useState<boolean>(false);
  const router = useRouter();
  const { setCurrentCemetery } = useAppStore();

  useEffect(() => {
    setCurrentCemetery(cemetery);
  }, [cemetery]);

  const handleSelectCemetery = (cemetery: CemeteryOut) => {
    setCurrentCemetery(cemetery);
    router.push(urlJoin(PATH.cemetery, cemetery.uuid));
  };

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
          <div className="flex flex-col items-center pt-5">
            <SelectingCemetery
              selectedCemetery={cemetery}
              onSelect={handleSelectCemetery}
              cemeteries={cemeteries}
              setSelectingOpen={setSelectingOpen}
            />
          </div>
          {isSelectingOpen && <div className="filter-indigo" />}
        </div>
      </div>
      <CemeteryInfo cemetery={cemetery} />
    </>
  );
}
