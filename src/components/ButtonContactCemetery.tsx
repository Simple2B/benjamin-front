import React from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';

type IButtonContactCemeteryProps = {
	icon: string,
	description: string,
}

const ButtonContactCemetery = ({icon, description}: IButtonContactCemeteryProps) => {
  return (
    <div className='inline-flex items-center gap-x-1 p-1.5 rounded-lg bg-turquoise-50'> 
      <IconButton iconName={ICONS_NAME[icon]} className={'h-3 w-3'}/>
      <p className='text-sm'>{description}</p>
    </div>
  );
};

export default ButtonContactCemetery;
