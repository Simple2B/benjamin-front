import React from 'react';
import SoldierProfile from './SoldierProfile';
import { ISolderPhotoGallery } from './PreviewCementery';
import { PATH } from '../constants/path.constants';
import urlJoin from 'url-join';
import Link from 'next/link';

type IHorizontalPhotoGalleryProps = {
  text: string;
  solders: ISolderPhotoGallery[];
  className: string;
};

const HorizontalPhotoGallery = ({
  text,
  solders,
  className,
}: IHorizontalPhotoGalleryProps) => {
  return (
    <div className={`w-full ${className}`}>
      <p className="text-indigo-100 font-semibold mb-3 leading-6 pl-5">
        {text}
      </p>
      <div className="flex gap-3 overflow-x-auto pb-4  text-indigo-100">
        {solders.map(({ uuid, photoUrl, name }, index) => (
          <Link href={urlJoin(PATH.soldier, uuid)} key={index}>
            <SoldierProfile photoUrl={photoUrl} name={name} index={index} />
          </Link>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default HorizontalPhotoGallery;
