import React from 'react';
import IconButton from '../IconButton';

type ISettingsBoxProps = {
  iconName: string;
  boxName: string;
};

const SettingsBox = ({ iconName, boxName }: ISettingsBoxProps) => {
  return (
    <div className="flex justify-start gap-3 py-3.5 w-[350px] items-center rounded-lg bg-grey-10 pl-4">
      <IconButton iconName={iconName} className="w-6 h-6" />
      <p>{boxName}</p>
    </div>
  );
};

export default SettingsBox;
