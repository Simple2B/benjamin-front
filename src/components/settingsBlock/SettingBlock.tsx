import React from 'react';
import { SETTINHS_INFO } from './SettingBlock.constants';
import SettingsBox from '../SettingsBox';

const SettingBlock = () => {
  return (
    <div className="flex flex-col gap-4">
      {SETTINHS_INFO.map(({ iconName, boxName }) => (
        <SettingsBox iconName={iconName} boxName={boxName} key={boxName} />
      ))}
    </div>
  );
};

export default SettingBlock;
