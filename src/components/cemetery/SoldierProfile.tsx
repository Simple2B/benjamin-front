import React from 'react';

export type ISoldierProfileProps = {
  photoUrl: string;
  name: string;
};

const SoldierProfile = ({ photoUrl, name }: ISoldierProfileProps) => {
  return (
    <div className="w-36 flex-shrink-0">
      <img
        className="w-36 h-32 rounded-lg bg-grey-300"
        src={photoUrl}
        alt="Soldier"
      />
      <p className="text-base text-center">{name}</p>
    </div>
  );
};

export default SoldierProfile;
