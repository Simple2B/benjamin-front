import React from 'react';
import Image from 'next/image';

export type ISoldierProfileProps = {
  photoUrl: string;
  name: string;
};

const SoldierProfile = ({ photoUrl, name }: ISoldierProfileProps) => {
  return (
    <div className={`w-36 flex-shrink-0`}>
      <Image
        src={photoUrl}
        width={140}
        height={132}
        alt="Soldier"
        className="h-32 w-36 object-cover rounded-lg"
      />
      <p className="text-base text-center leading-5 mt-2">{name}</p>
    </div>
  );
};

export default SoldierProfile;
