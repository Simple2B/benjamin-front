'use client';
import React, { useState, useEffect } from 'react';
import { CemeteryOut } from '@/openapi';
import CemeteryAdditionalInfo from './cemeteryAdditionalInfo/CemeteryAdditionalInfo';
import HorizontalPhotoGallery from './HorizontalPhotoGallery';
import MapCemetery from './MapCemetery';
import SearchBar from '../SearchBar';
import SelectingCemetery from '../SelectingCementery';
import CemeteryMainInfo from './cemeteryMainInfo/CemeteryMainInfo';
import { useRouter } from 'next/navigation';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import { CemeteryAudioBox } from './cemeteryMainInfo/CemeteryAudioBox';
import { useAppStore } from '@/lib/slices/store';

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
  const router = useRouter();
  const { setCurrentCemetery } = useAppStore();

  const soliers = [
    {
      uuid: '',
      photoUrl: '/images/photos/soldier1.jpg',
      name: '1st Lt. Robert S. Fink',
    },
    {
      uuid: '',
      photoUrl: '/images/photos/soldier2.jpg',
      name: 'Sgt. Charles Solomon',
    },
    {
      uuid: '',
      photoUrl: '/images/photos/soldier1.jpg',
      name: 'Pvt. Alan Franken',
    },
    {
      uuid: '',
      photoUrl: '/images/photos/soldier2.jpg',
      name: '1st Lt. Robert S. Fink',
    },
  ];

  useEffect(() => {
    setCurrentCemetery(cemetery);
  }, [cemetery]);

  const handleSelectCemetery = (cemetery: CemeteryOut) => {
    setCurrentCemetery(cemetery);
    router.push(urlJoin(PATH.cemetery, cemetery.uuid));
  };

  return (
    <>
      <div className="flex flex-col items-center w-full bg-white">
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
            />
          </div>
        </div>

        <CemeteryMainInfo
          name={cemetery.name}
          location={cemetery.location ? cemetery.location : ''}
          phone={cemetery.phone}
          email={cemetery.email}
          webUrl={cemetery.webUrl}
        />
        {cemetery.audio_tours.length ? (
          <CemeteryAudioBox audio_tours={cemetery.audio_tours} />
        ) : null}
        <div className="flex flex-col gap-6 items-center w-full px-6 z-10 bg-white">
          <CemeteryAdditionalInfo
            superintendent={cemetery.superintendent}
            war={cemetery.war}
            numberOfSoldiersBuried={cemetery.amountBuriedSoldiersCommon}
            numberOfJewishSoldiersBuried={cemetery.amountBuriedSoldiersJewish}
            listedAsMissingSoldiers={cemetery.amountBuriedSoldiersMissing}
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-6 items-center mb-8 w-full z-10 pb-5 bg-white pt-6">
        <HorizontalPhotoGallery
          text="Soldiers with Headstone Changes"
          solders={soliers}
          className="z-10"
        />
        <HorizontalPhotoGallery
          text="Soldiers born in New York"
          solders={soliers}
          className="z-10"
        />
      </div>
    </>
  );
}
