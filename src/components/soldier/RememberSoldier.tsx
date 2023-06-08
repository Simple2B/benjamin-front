import React from 'react';
import Image from 'next/image';

type IRememberSoldierProps = {
  name: string;
};

const REMEMBERING = [
  {
    image: '/images/photos/prayer.jpg',
    text: 'Recite a prayer',
  },
  {
    image: '/images/photos/stone.jpg',
    text: 'Lay a stone',
  },
  {
    image: '/images/photos/message.jpg',
    text: 'Write a message',
  },
];

const RememberSoldier = ({ name }: IRememberSoldierProps) => {
  return (
    <div className="w-full px-8 pt-6 bg-indigo-100 text-center">
      <h2 className="text-white font-semibold my-6 leading-6">
        REMEMBER {name.toLocaleUpperCase()}
      </h2>
      <div className="flex justify-between pb-14 gap-4">
        {REMEMBERING.map(({ image, text }) => {
          return (
            <div key="text" className="w-[106px] flex flex-col justify-evenly ">
              <Image
                src={image}
                width={500}
                height={500}
                alt="remember soldier"
                className="w-[106px] object-cover rounded-lg bg-grey-30"
              />
              <p className="text-white text-xs text-center">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RememberSoldier;
