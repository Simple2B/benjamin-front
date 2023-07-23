import React from 'react';
import IconButton from '../IconButton';

type ISoldierMainInfoProps = {
  heading: string;
  text: string | string[] | undefined;
  icon: string;
};

export const SoldierMainInfo = ({
  heading,
  text,
  icon,
}: ISoldierMainInfoProps) => {
  return (
    <>
      {text && (
        <div>
          <div className="flex items-center">
            <IconButton iconName={icon} className="h-3 w-3 m-1" />
            <p className="text-sm text-grey-20 leading-7">{heading}</p>
          </div>
          <p className="ml-4 font-medium leading-6">{text}</p>
        </div>
      )}
    </>
  );
};
