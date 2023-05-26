import React from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';

type ISoldierMainInfoProps = {
  heading: string;
  text: string;
  icon: string;
};

const SoldierMainInfo = ({ heading, text, icon }: ISoldierMainInfoProps) => {
  return (
    <div>
      <div className="flex">
        <IconButton iconName={icon} className="h-3 w-3 m-1" />
        <p className="text-sm text-grey-20">{heading}</p>
      </div>
      <p className="ml-4 font-medium">{text}</p>
    </div>
  );
};

export default SoldierMainInfo;
