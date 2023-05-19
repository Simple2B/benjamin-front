'use client';
import SearchBar from '@/components/SearchBar';
import SelectingCemetery from '@/components/SelectingCementery';
import React, { useState } from 'react';
import { ICONS_NAME } from '@/components/constants/iconName';
import MapCemetery from '@/components/MapCemetery';
import CemeteryMainInfo, { IContactInfo } from '@/components/CemeteryMainInfo';
import AdditionalInfo from '@/components/AdditionalInfo';
import HorizontalPhotoGallery from '@/components/HorizontalPhotoGallery';

export default function Page() {
  const [inputSoldier, setInputSoldier] = useState<string>();
  const [selectedCemetery, setSelectedCemetery] = useState<
    string | undefined
  >();

  const contactInfo: IContactInfo[] = [
    {
      icon: ICONS_NAME.telephone,
      description: 'Call',
    },
    {
      icon: ICONS_NAME.envelope,
      description: 'Email',
    },
    {
      icon: ICONS_NAME.web,
      description: 'Website',
    },
  ];
  return (
    <div className="flex flex-col gap-6 items-center px-4 mb-4">
      <MapCemetery />
      <SearchBar setInputSoldier={setInputSoldier} />
      <SelectingCemetery setCemetery={setSelectedCemetery} />
      <CemeteryMainInfo
        name="Normandy American Cemetery"
        location="Rte du Cimetiere Americain, 14710 Colleville-sur-Mer, France"
        contactInfo={contactInfo}
        audioSrc="https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
      />
      <AdditionalInfo
        superintendent="John McJohn"
        war="World War II"
        numberOfSoldiersBuried={12000}
        numberOfJewishSoldiersBuried={250}
        listedAsMissingSoldiers={500}
      />
      <HorizontalPhotoGallery text="Soldiers with Headstone Changes" />
      <HorizontalPhotoGallery text="Soldiers born in New York" />
    </div>
  );
}
