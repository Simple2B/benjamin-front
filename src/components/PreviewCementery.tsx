'use client';
import React, { useState } from 'react';
import { CemeteryOut } from '@/openapi';
import AdditionalInfo from './AdditionalInfo';
import CemeteryMainInfo, { IContactInfo } from './CemeteryMainInfo';
import HorizontalPhotoGallery from './HorizontalPhotoGallery';
import MapCemetery from './MapCemetery';
import SearchBar from './SearchBar';
import SelectingCemetery from './SelectingCementery';
import { ICONS_NAME } from './constants/iconName';

interface CemeteryPageProps {
  cemetery: CemeteryOut;
}

export default function PreviewCementery({ cemetery }: CemeteryPageProps) {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const [selectedCemetery, setSelectedCemetery] = useState<string>('');

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
      link: cemetery.urlPath,
    },
  ];
  console.log(cemetery);
  return (
    <div className="flex flex-col gap-6 items-center px-4 mb-4 w-full">
      <MapCemetery />
      <SearchBar setInputSoldier={setInputSoldier} />
      <SelectingCemetery setCemetery={setSelectedCemetery} />
      <CemeteryMainInfo
        name={cemetery.name}
        location={cemetery.location}
        contactInfo={contactInfo}
        audioSrc="https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
      />
      <AdditionalInfo
        superintendent={cemetery.superintendent}
        war={cemetery.war}
        numberOfSoldiersBuried={12000}
        numberOfJewishSoldiersBuried={250}
        listedAsMissingSoldiers={500}
      />
      <HorizontalPhotoGallery text="Soldiers with Headstone Changes" />
      <HorizontalPhotoGallery text="Soldiers born in New York" />
    </div>
  );
}
