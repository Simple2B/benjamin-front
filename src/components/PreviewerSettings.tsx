'use client';
import React from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import SettingBlock from './settingsBlock/SettingBlock';
import { Metadata } from '@/openapi/models/Metadata';
import { useRouter } from 'next/navigation';

type IPreviewerSettingsProps = { settingsData: Metadata };

const LINKS = ['aboutUrl', 'gravestoneFormUrl', 'contactUsUrl', 'donateUrl'];

export default function PreviewerSettings({
  settingsData,
}: IPreviewerSettingsProps) {
  const router = useRouter();

  const links: { [key: string]: string } = {};

  (Object.keys(settingsData) as (keyof typeof settingsData)[]).forEach(
    (key) => {
      if (LINKS.includes(key)) {
        links[key] = settingsData[key];
      }
    }
  );

  return (
    <div className="flex flex-col items-start m-6 gap-5">
      <div
        className="w-full flex items-baseline justify-between"
        onClick={router.back}
      >
        <IconButton
          iconName={ICONS_NAME.selectingArrow}
          className="w-4 h-4 rotate-180"
        />

        <h1 className="text-2xl font-semibold flex-grow text-center">
          Settings
        </h1>
      </div>

      <SettingBlock links={links} />
    </div>
  );
}
