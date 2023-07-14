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
  isScrolledDown: boolean;
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

const RememberSoldier = ({
  soldierFirstName,
  soldierLastName,
  soldierSufix,
  soldierUuid,
  isScrolledDown,
}: IRememberSoldierProps) => {
  return (
    <>
      <div
        className={`w-full px-8 pt-3 z-10 text-black text-center fixed bottom-0 h-40 ${
          isScrolledDown
            ? 'text-black transition-all duration-[1500ms]'
            : 'text-white transition-all duration-[500ms]'
        }`}
      >
        <h2 className=" mb-4 leading-6">
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
                    className={`w-[52px] h-[52px] flex justify-center items-center rounded-lg ${
                      isScrolledDown
                        ? 'bg-gradient-to-b from-[#1f7088] to-[#15415a] '
                        : 'bg-transparent'
                    }`}
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

      <div
        className={`bottom-0 h-40 w-full px-8 pt-3 ${
          isScrolledDown
            ? 'bg-white transition-all duration-[2000ms] '
            : 'bg-transparent transition-all duration-[2000ms]'
        } fixed z-[5]`}
      ></div>
      <div
        className={`bottom-0 h-40 w-full px-8 pt-3 
             bg-gradient-to-b from-[#217890] to-indigo-100 t fixed z-[4]`}
      ></div>
    </>
  );
};

export default RememberSoldier;
