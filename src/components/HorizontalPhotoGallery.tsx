import React from 'react';
import SoldierProfile, { ISoldierProfileProps } from './SoldierProfile';

type IHorizontalPhotoGalleryProps = {
  text: string;
};

const HorizontalPhotoGallery = ({ text }: IHorizontalPhotoGalleryProps) => {
  const solierHeadstoneChanges: ISoldierProfileProps[] = [
    {
      photoUrl: '',
      name: '1st Lt. Robert S. Fink',
    },
    {
      photoUrl: '',
      name: 'Sgt. Charles Solomon',
    },
    {
      photoUrl: '',
      name: 'Pvt. Alan Franken',
    },
  ];
  return (
    <div className="w-full">
      <p className="text-indigo-100 font-semibold">{text}</p>
      <div className="flex gap-3 overflow-x-scroll pb-4">
        {solierHeadstoneChanges.map(({ photoUrl, name }) => (
          <SoldierProfile photoUrl={photoUrl} name={name} key={name} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default HorizontalPhotoGallery;
