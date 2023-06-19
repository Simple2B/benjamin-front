import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

export default function MapCemetery() {
  return (
    <div className="w-full bg-grey-20 absolute flex justify-end items-end p-4 t-0 l-0 h-[calc(100vh-400px)]">
      <div className="flex w-12 h-12 justify-center items-center bg-white rounded-3xl rotate-45 mb-[22px] mr-2">
        <IconButton iconName={ICONS_NAME.navigation} className="w-5 h-5" />
      </div>
    </div>
  );
}
