import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

export const CategoryExample = () => {
  const filterExamples = [
    { iconName: ICONS_NAME.locationPin, iconDescription: 'Born in New York' },
    { iconName: ICONS_NAME.calendar, iconDescription: 'Born in April' },
    { iconName: ICONS_NAME.davidStar, iconDescription: 'Headstone Change' },
    { iconName: ICONS_NAME.locationPin, iconDescription: 'Born in New York' },
    { iconName: ICONS_NAME.calendar, iconDescription: 'Born in April' },
    { iconName: ICONS_NAME.davidStar, iconDescription: 'Headstone Change' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-4  text-indigo-100 mt-5">
      {filterExamples.map(({ iconName, iconDescription }, index) => (
        <div
          className={`bg-turquoise-50 h-8 pl-[10px] pr-3 flex gap-3 justify-center items-center rounded-2xl whitespace-nowrap flex-shrink-0 overflow-hidden ${
            index == 0 ? 'ml-[calc((100vw-350px)/2)]' : ''
          }`}
          key={index}
        >
          <IconButton iconName={iconName} className="h-3 w-3" />
          <p className="text-sm leading-5">{iconDescription}</p>
        </div>
      ))}
      <div
        className="bg-turquoise-50 h-8 pl-[10px] pr-3 flex gap-3 justify-center items-center rounded-2xl whitespace-nowrap flex-shrink-0 overflow-hidden"
        onClick={() => {
          console.log('+');
        }}
      >
        <IconButton iconName={ICONS_NAME.ellipsis} className="h-3 w-3" />
        <p>More</p>
      </div>
    </div>
  );
};
