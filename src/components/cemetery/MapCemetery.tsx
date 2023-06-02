import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

export default function MapCemetery() {
  return (
    <div className="h-96 w-full bg-grey-20 absolute flex justify-end items-end p-4">
      <div className="flex w-9 h-9 justify-center items-center bg-white rounded-3xl rotate-45 m-3">
        <IconButton iconName={ICONS_NAME.navigation} className="w-5 h-5" />
      </div>
    </div>
  );
}
