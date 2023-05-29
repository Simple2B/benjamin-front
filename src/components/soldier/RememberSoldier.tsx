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
    <div className="w-full p-4 bg-indigo-100 text-center">
      <h2 className="text-white font-semibold my-2">
        REMEMBER {name.toLocaleUpperCase()}
      </h2>
      <div className="flex justify-evenly">
        {REMEMBERING.map(({ image, text }) => {
          return (
            <div key="text" className="w-1/4">
              <Image
                src={image}
                width={500}
                height={500}
                alt="remember soldier"
                className="w-24 object-cover rounded-lg bg-grey-30"
              />
              <p className="text-white text-xs pt-1">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RememberSoldier;
