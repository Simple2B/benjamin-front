'use client';
import React, { useState } from 'react';
import { CemeteryOut } from '@/openapi';
import CemeteryAdditionalInfo from './cemeteryAdditionalInfo/CemeteryAdditionalInfo';

import HorizontalPhotoGallery from '../HorizontalPhotoGallery';
import MapCemetery from './MapCemetery';
import SearchBar from '../SearchBar';
import SelectingCemetery from '../SelectingCementery';
import { ICONS_NAME } from '../constants/iconName';
import CemeteryMainInfo, {
  IContactInfo,
} from './cemeteryMainInfo/CemeteryMainInfo';

interface CemeteryPageProps {
  cemetery: CemeteryOut;
  cemeteries: Array<CemeteryOut>;
}

export default function PreviewCementery({
  cemetery,
  cemeteries,
}: CemeteryPageProps) {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const [selectedCemetery, setSelectedCemetery] =
    useState<CemeteryOut>(cemetery);

  const contactInfo: IContactInfo[] = [
    {
      icon: ICONS_NAME.telephone,
      description: 'Call',
      link: cemetery.phone,
    },
    {
      icon: ICONS_NAME.envelope,
      description: 'Email',
      link: cemetery.email,
    },
    {
      icon: ICONS_NAME.web,
      description: 'Website',
      link: cemetery.webUrl,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-5 items-center w-full">
        <MapCemetery />
        <div className="mx-8">
          <SearchBar setInputSoldier={setInputSoldier} />
        </div>

        <SelectingCemetery
          setCemetery={setSelectedCemetery}
          selectedCemetery={selectedCemetery}
          cemeteries={cemeteries}
          isRedirecting={true}
        />
        <CemeteryMainInfo
          name={selectedCemetery.name}
          location={selectedCemetery.location ? selectedCemetery.location : ''}
          contactInfo={contactInfo}
          audioSrc="https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
        />
        <div className="flex flex-col gap-6 items-center w-full px-6 z-10">
          <CemeteryAdditionalInfo
            superintendent={selectedCemetery.superintendent}
            war={selectedCemetery.war}
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
