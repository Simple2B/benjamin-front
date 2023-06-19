import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

interface IMapCemetery {
  scrollLevel: ScrollLevel;
}

type ScrollLevel = 'start' | 'medium' | 'end';

export default function MapCemetery({ scrollLevel }: IMapCemetery) {
  const LEVELS = {
    start: 'h-[calc(100vh-175px)]',
    medium: 'h-[calc(100vh-400px)]',
    end: 'h-[calc(100vh-100vh)]',
  };

  return (
    <div
      className={`w-full bg-grey-20 absolute flex justify-end items-end p-4 t-0 l-0 ${LEVELS[scrollLevel]}`}
    >
      <div className="flex w-12 h-12 justify-center items-center bg-white rounded-3xl rotate-45 mb-[22px] mr-2">
        <IconButton iconName={ICONS_NAME.navigation} className="w-5 h-5" />
      </div>
    </div>
  );
}
