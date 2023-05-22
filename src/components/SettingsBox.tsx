import React from 'react';
import IconButton from './IconButton';

type ISettingsBoxProps = {
  iconName: string;
  boxName: string;
};

const SettingsBox = ({ iconName, boxName }: ISettingsBoxProps) => {
  return (
    <div className="flex justife-start gap-3 p-2 w-full items-center rounded-lg bg-grey-10">
      <IconButton iconName={iconName} className="w-6 h-6" />
      <p>{boxName}</p>
    </div>
  );
};

export default SettingsBox;
