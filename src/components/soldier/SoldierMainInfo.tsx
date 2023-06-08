import React from 'react';
import IconButton from '../IconButton';

type ISoldierMainInfoProps = {
  heading: string;
  text: string | string[];
  icon: string;
};

const SoldierMainInfo = ({ heading, text, icon }: ISoldierMainInfoProps) => {
  return (
    <div>
      <div className="flex">
        <IconButton iconName={icon} className="h-3 w-3 m-1" />
        <p className="text-sm text-grey-20">{heading}</p>
      </div>
      {Array.isArray(text) ? (
        text.map((award) => {
          return (
            <p key={award} className="ml-4 font-medium leading-7">
              {award}
            </p>
          );
        })
      ) : (
        <p className="ml-4 font-medium leading-6">{text}</p>
      )}
    </div>
  );
};

export default SoldierMainInfo;
