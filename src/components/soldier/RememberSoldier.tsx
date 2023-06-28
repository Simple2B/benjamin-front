import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';

type IRememberSoldierProps = {
  name: string | undefined;
  soldierUuid: string;
};

const REMEMBERING = [
  {
    image: '/images/photos/prayer.jpg',
    text: 'Recite a prayer',
    link: 'prayer',
  },
  {
    image: '/images/photos/stone.jpg',
    text: 'Lay a stone',
    link: 'stone',
  },
  {
    image: '/images/photos/message.jpg',
    text: 'Write a message',
    link: 'message',
  },
];

const RememberSoldier = ({ name, soldierUuid }: IRememberSoldierProps) => {
  return (
    <div className="w-full px-8 pt-6 bg-indigo-100 text-center">
      <h2 className="text-white font-semibold my-6 leading-6">
        REMEMBER {name?.toLocaleUpperCase()}
      </h2>
      <div className="flex justify-center pb-14 gap-4">
        {REMEMBERING.map(({ image, text, link }) => {
          return (
            <Link
              key="text"
              href={urlJoin(PATH[link as keyof typeof PATH], soldierUuid)}
            >
              <div className="w-[106px] flex flex-col justify-evenly ">
                <Image
                  src={image}
                  width={500}
                  height={500}
                  alt="remember soldier"
                  className="w-[106px] object-cover rounded-lg bg-grey-30"
                />
                <p className="text-white text-[11px] text-center leading-7 mt-1">
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
