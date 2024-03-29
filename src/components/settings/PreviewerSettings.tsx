'use client';
import React, { useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { Metadata } from '@/openapi/models/Metadata';
import { redirect, useRouter } from 'next/navigation';
import SettingBlock from './settingsBlock/SettingBlock';
import SelectingCemetery from '../SelectingCementery';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryOut } from '@/openapi';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import Image from 'next/image';
import { IntroAnimationSwitcher } from './IntroAnimationSwitcher';

type IPreviewerSettingsProps = {
  settingsData: Metadata;
  cemeteries: CemeteryOut[];
};

const LINKS = ['aboutUrl', 'gravestoneFormUrl', 'contactUsUrl', 'donateUrl'];

export default function PreviewerSettings({
  settingsData,
  cemeteries,
}: IPreviewerSettingsProps) {
  const [isSelectingOpen, setSelectingOpen] = useState<boolean>(false);
  const router = useRouter();
  const { setCurrentCemetery, currentCemetery } = useAppStore();
  const [selectedCemetery, setSelectedCemetery] = useState<
    CemeteryOut | undefined
  >(undefined);

  const handleSelect = (cemetery: CemeteryOut) => {
    setCurrentCemetery(cemetery);
    setSelectedCemetery(cemetery);
  };

  if (!currentCemetery) {
    redirect(PATH.location);
  }

  const handleRouterBack = () => {
    if (selectedCemetery) {
      router.push(urlJoin(PATH.cemetery, selectedCemetery.uuid));
    } else {
      router.back();
    }
  };

  const links: { [key: string]: string } = {};

  (Object.keys(settingsData) as (keyof typeof settingsData)[]).forEach(
    (key) => {
      if (LINKS.includes(key)) {
        links[key] = settingsData[key];
      }
    }
  );

  return (
    <div className="bg-white flex flex-col justify-between w-full ">
      <div className="flex flex-col items-start m-6 gap-8 ">
        <div
          className="w-full flex items-center justify-between"
          onClick={handleRouterBack}
        >
          <IconButton
            iconName={ICONS_NAME.navigateBack}
            className="w-6 h-6 rotate-180"
          />
          <h1 className="text-2xl font-semibold flex-grow text-center leading-7">
            Settings
          </h1>
        </div>
        <div className="flex flex-col items-center w-full">
          <SelectingCemetery
            selectedCemetery={currentCemetery}
            onSelect={handleSelect}
            cemeteries={cemeteries}
            setSelectingOpen={setSelectingOpen}
            boxWidth="w-[350px]"
          />
        </div>
        {isSelectingOpen && <div className="filter-indigo" />}
        <SettingBlock links={links} />
        <div className="w-[350px] h-px bg-indigo-100 bg-opacity-10"></div>
        <IntroAnimationSwitcher />
      </div>
      <div className="mb-12 w-full flex justify-center mt-[120px]">
        <Image
          src="/images/icons/logo.jpg"
          width={143}
          height={83}
          alt="icon"
        />
      </div>
    </div>
  );
}
