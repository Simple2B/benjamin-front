import React from 'react';
import { SETTINHS_INFO } from './SettingBlock.constants';
import SettingsBox from '../SettingsBox';
import Link from 'next/link';

interface ISettingsBlockProps {
  links: { [key: string]: string };
}

export default function SettingBlock({ links }: ISettingsBlockProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {SETTINHS_INFO.map(({ iconName, boxName, linkName }) => (
        <Link href={links[linkName]} key={boxName}>
          <SettingsBox iconName={iconName} boxName={boxName} />
        </Link>
      ))}
    </div>
  );
}