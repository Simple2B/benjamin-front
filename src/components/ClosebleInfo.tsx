'use client';
import React, { useState } from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import { PropsWithChildren } from 'react';

type IClosebleInfoProps = {
  heading: string;
  isOpened: boolean;
  children: React.ReactNode;
};

const ClosebleInfo = ({
  children,
  heading,
  isOpened,
}: PropsWithChildren<IClosebleInfoProps>) => {
  const [isOpen, setOpen] = useState<boolean>(isOpened);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="w-[350px] p-4 bg-grey-10 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold leading-6">{heading}</h2>
        <div onClick={handleClick}>
          {isOpen ? (
            <IconButton iconName={ICONS_NAME.line} className={'h-4 w-8'} />
          ) : (
            <IconButton iconName={ICONS_NAME.plus} className={'h-4 w-8'} />
          )}
        </div>
      </div>

      {isOpen && <>{children}</>}
    </div>
  );
};

export default ClosebleInfo;
