import React from 'react';
import Link from 'next/link';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import IconButton from '../IconButton';

type IRememberSoldierProps = {
  name: string | undefined;
  soldierUuid: string;
};

const REMEMBERING = [
  {
    image: 'prayer',
    text: 'Recite a prayer',
    link: 'prayer',
  },
  {
    image: 'stone',
    text: 'Lay a stone',
    link: 'stone',
  },
  {
    image: 'message',
    text: 'Write a message',
    link: 'message',
  },
];

const RememberSoldier = ({ name, soldierUuid }: IRememberSoldierProps) => {
  return (
    <div className="w-full px-8 pt-3 bg-gradient-to-b from-[#217890] to-indigo-100 text-center">
      <h2 className="text-white mb-4 leading-6">
        REMEMBER {name?.toLocaleUpperCase()}
      </h2>
      <div className="flex justify-center pb-12 gap-4">
        {REMEMBERING.map(({ image, text, link }) => {
          return (
            <Link
              key="text"
              href={urlJoin(PATH[link as keyof typeof PATH], soldierUuid)}
            >
              <div className="w-[106px] flex flex-col justify-evenly items-center">
                <IconButton iconName={image} className={'h-10 w-10'} />
                <p className="text-white text-xs text-center leading-7 mt-1">
                  {text}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RememberSoldier;
