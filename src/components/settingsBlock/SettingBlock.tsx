import React from 'react';
import { SETTINHS_INFO } from './SettingBlock.constants';
import SettingsBox from '../SettingsBox';
import Link from 'next/link';

const SettingBlock = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {SETTINHS_INFO.map(({ iconName, boxName, link }) => (
        <Link href={link} key={boxName}>
          <SettingsBox iconName={iconName} boxName={boxName} />
        </Link>
      ))}
    </div>
  );
};

export default SettingBlock;
