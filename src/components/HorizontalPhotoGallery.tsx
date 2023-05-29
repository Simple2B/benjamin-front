import React from 'react';
import SoldierProfile, {
  ISoldierProfileProps,
} from './cemetery/SoldierProfile';

type IHorizontalPhotoGalleryProps = {
  text: string;
};

const HorizontalPhotoGallery = ({ text }: IHorizontalPhotoGalleryProps) => {
  const solierHeadstoneChanges: ISoldierProfileProps[] = [
    {
      photoUrl: '/images/photos/soldier1.jpg',
      name: '1st Lt. Robert S. Fink',
    },
    {
      photoUrl: '/images/photos/soldier2.jpg',
      name: 'Sgt. Charles Solomon',
    },
    {
      photoUrl: '/images/photos/soldier1.jpg',
      name: 'Pvt. Alan Franken',
    },
    {
      photoUrl: '/images/photos/soldier2.jpg',
      name: '1st Lt. Robert S. Fink',
    },
  ];
  return (
    <div className="w-full">
      <p className="text-indigo-100 font-semibold">{text}</p>
      <div className="flex gap-3 overflow-x-auto pb-4 ">
        {solierHeadstoneChanges.map(({ photoUrl, name }) => (
          <SoldierProfile photoUrl={photoUrl} name={name} key={name} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default HorizontalPhotoGallery;
