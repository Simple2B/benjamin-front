import React from 'react';
import Link from 'next/link';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import IconButton from '../IconButton';

type IRememberSoldierProps = {
  soldierFirstName: string;
  soldierLastName: string;
  soldierSufix: string | undefined;
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

export const RememberSoldier = ({
  soldierFirstName,
  soldierLastName,
  soldierSufix,
  soldierUuid,
}: IRememberSoldierProps) => {
  return (
    <div
      className={`w-full px-8 pt-3 z-10 text-black text-center bottom-0 h-40 bg-white`}
    >
      <h2 className=" mb-6 leading-6 font-semibold">
        Remember {soldierSufix} {soldierFirstName} {soldierLastName}
      </h2>
      <div className="flex justify-center pb-12 gap-4">
        {REMEMBERING.map(({ image, text, link }, index) => {
          return (
            <Link
              key={index}
              href={urlJoin(PATH[link as keyof typeof PATH], soldierUuid)}
            >
              <div className="w-[106px] flex flex-col justify-evenly items-center">
                <div
                  className={`w-[52px] h-[52px] flex justify-center items-center rounded-lg bg-gradient-to-b from-[#1f7088] to-[#15415a] `}
                >
                  <IconButton iconName={image} className={'h-10 w-10'} />
                </div>
                <p className="text-xs text-center leading-7 mt-1">{text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
