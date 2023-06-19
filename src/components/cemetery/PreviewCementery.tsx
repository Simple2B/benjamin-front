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
          <div className={`${isSelectingOpen ? 'filter-indigo' : ''} `}> </div>
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
      <div className="relative flex flex-col gap-6 items-center pb-8 w-full z-10 bg-white pt-6">
        <HorizontalPhotoGallery text="Soldiers with Headstone Changes" />
        <HorizontalPhotoGallery text="Soldiers born in New York" />
      </div>
    </>
  );
}
