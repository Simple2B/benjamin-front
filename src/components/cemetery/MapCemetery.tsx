import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

export default function MapCemetery() {
  return (
    <div className="h-96 w-full bg-grey-20 absolute flex justify-end items-end p-4">
      <div className="flex w-8 h-8 justify-center items-center bg-white rounded-3xl rotate-45">
        <IconButton iconName={ICONS_NAME.navigation} className="w-4 h-4" />
      </div>
    </div>
  );
}
