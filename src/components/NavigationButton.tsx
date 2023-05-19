'use client';
import React, { useEffect, useState } from 'react';
import IconButton from './IconButton';

type INavigationButtonProps = {
  icon: string;
  action: string;
  className: string;
  isButtonEnabled: boolean;
};

const NavigationButton = ({
  icon,
  action,
  className,
  isButtonEnabled,
}: INavigationButtonProps) => {
  return (
    <div>
      <div
        className={`inline-flex items-center gap-x-1 p-3 rounded-lg justify-evenly m-3 ${className} ${
          isButtonEnabled ? 'bg-turquoise-100' : 'bg-grey-30'
        }`}
      >
        <p className="text-white">{action}</p>
        <IconButton iconName={icon} className={'h-3 w-3'} />
      </div>
    </div>
  );
};

export default NavigationButton;
