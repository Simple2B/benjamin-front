import React from 'react';
import { IStonePhotosGallery } from './PreviewerStone';
import urlJoin from 'url-join';
import { AWS_BASE_URL } from '../constants/constants';

type IStoneHorizontalGalleryProps = {
  stonePhotosGallery: IStonePhotosGallery[];
};

//src={urlJoin(AWS_BASE_URL || '', photo)}

export const StoneHorizontalGallery = ({
  stonePhotosGallery,
}: IStoneHorizontalGalleryProps) => {
  return (
    <>
      {stonePhotosGallery.length ? (
        <div className="flex gap-4 overflow-x-auto pb-4 text-indigo-100 px-8 w-full whitespace-nowrap mb-16">
          {stonePhotosGallery.map(({ date, sender, photo }, index) => (
            <div className={`w-[148px] flex-shrink-0`} key={index}>
              {photo ? (
                <img
                  src={photo}
                  alt="stone"
                  className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"
                />
              ) : (
                <div className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"></div>
              )}

              <p className="text-xs text-center leading-6 mt-[6px]">{date}</p>
              <p className="text-xs text-center leading-6">{sender}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default StoneHorizontalGallery;
