'use client';
import React, { useState } from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import { PropsWithChildren } from 'react';

type IClosebleInfoProps = {
  heading: string;
  children: React.ReactNode;
};

const ClosebleInfo = ({
  children,
  heading,
}: PropsWithChildren<IClosebleInfoProps>) => {
  const [isOpen, setOpen] = useState<boolean>(true);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="w-full p-3 bg-grey-10 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{heading}</h2>
        <div onClick={handleClick}>
          <IconButton iconName={ICONS_NAME.line} className={'h-4 w-8'} />
        </div>
      </div>

      {isOpen && <>{children}</>}
    </div>
  );
};

export default ClosebleInfo;
