import React from 'react';
import IconButton from '../IconButton';

type IButtonContactCemeteryProps = {
  icon: string;
  description: string;
};

const ButtonContactCemetery = ({
  icon,
  description,
}: IButtonContactCemeteryProps) => {
  return (
    <div className="inline-flex items-center gap-x-1 py-1.5 rounded-lg bg-turquoise-50 text-indigo-100 leading-5 px-2 ">
      <IconButton iconName={icon} className={'h-3 w-3'} />
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ButtonContactCemetery;
