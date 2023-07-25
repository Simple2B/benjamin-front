import React from 'react';
import SoldierProfile from './SoldierProfile';
import { SoldierCardWithPhoto } from '@/openapi';

type IHorizontalPhotoGalleryProps = {
  text: string;
  solders: SoldierCardWithPhoto[];
  className: string;
  dash: boolean;
};

const HorizontalPhotoGallery = ({
  text,
  solders,
  className,
  dash,
}: IHorizontalPhotoGalleryProps) => {
  return (
    <>
      {solders.length ? (
        <div className={`w-full ${className}`}>
          <p className="text-indigo-100 font-semibold mb-3 leading-6 pl-5">
            {text}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-4  text-indigo-100 px-6">
            {solders.map(
              (
                { mainPhoto, firstName, lastName, suffix, uuid, ranks },
                index
              ) => (
                <SoldierProfile
                  photoUrl={mainPhoto}
                  rank={ranks.map((rank) => rank.abbreviation).join(' ')}
                  firstName={firstName}
                  lastName={lastName}
                  suffix={suffix}
                  uuid={uuid}
                  key={index}
                />
              )
            )}
          </div>
          {dash && (
            <div className="mx-6">
              <hr className="border-indigo-100 border-opacity-10" />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default HorizontalPhotoGallery;
