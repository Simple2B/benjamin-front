'use client';
import React, { useState } from 'react';
import { CemeteryOut } from '@/openapi';
import CemeteryAdditionalInfo from './cemeteryAdditionalInfo/CemeteryAdditionalInfo';
import HorizontalPhotoGallery from '../HorizontalPhotoGallery';
import MapCemetery from './MapCemetery';
import SearchBar from '../SearchBar';
import SelectingCemetery from '../SelectingCementery';
import CemeteryMainInfo from './cemeteryMainInfo/CemeteryMainInfo';
import { useRouter } from 'next/navigation';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import { CemeteryAudioBox } from './cemeteryMainInfo/CemeteryAudioBox';

interface CemeteryPageProps {
  cemetery: CemeteryOut;
  cemeteries: Array<CemeteryOut>;
}

export default function PreviewCementery({
  cemetery,
  cemeteries,
}: CemeteryPageProps) {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const router = useRouter();

  const handleSelectCemetery = (cemetery: CemeteryOut) => {
    router.push(urlJoin(PATH.cemetery, cemetery.uuid));
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center w-full">
        <MapCemetery />
        <div className="mx-8">
          <SearchBar setInputSoldier={setInputSoldier} />
        </div>

        <SelectingCemetery
          selectedCemetery={cemetery}
          onSelect={handleSelectCemetery}
          cemeteries={cemeteries}
        />
        <CemeteryMainInfo
          name={cemetery.name}
          location={cemetery.location ? cemetery.location : ''}
          phone={cemetery.phone}
          email={cemetery.email}
          webUrl={cemetery.webUrl}
        />
        <CemeteryAudioBox audio_tours={cemetery.audio_tours} />
        <div className="flex flex-col gap-6 items-center w-full px-6 z-10">
          <CemeteryAdditionalInfo
            superintendent={cemetery.superintendent}
            war={cemetery.war}
            numberOfSoldiersBuried={12000}
            numberOfJewishSoldiersBuried={250}
            listedAsMissingSoldiers={500}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center pl-5 mb-8 w-full z-10">
        <HorizontalPhotoGallery text="Soldiers with Headstone Changes" />
        <HorizontalPhotoGallery text="Soldiers born in New York" />
      </div>
    </>
  );
}
