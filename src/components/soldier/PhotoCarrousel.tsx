import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import urlJoin from 'url-join';
import { AWS_BASE_URL } from '../constants/constants';

type IPhotoCarrouselProps = {
  photos: Array<string>;
};

export const PhotoCarrousel = ({ photos }: IPhotoCarrouselProps) => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  return (
    <>
      {photos.length ? (
        <div className="rounded-xl mt-3">
          <p className="text-sm text-grey-20 leading-7">Photos</p>
          <div className="flex justify-center items-center gap-60 mt-[100px] absolute w-[318px]">
            <button onClick={() => prev()}>
              <IconButton
                iconName={ICONS_NAME.selectingArrow}
                className="w-4 h-4 rotate-180 negative"
              />
            </button>
            <button onClick={() => next()}>
              <IconButton
                iconName={ICONS_NAME.selectingArrow}
                className="w-4 h-4 negative"
              />
            </button>
          </div>
          <ul
            ref={scrollRef}
            style={{
              scrollSnapType: 'x mandatory',
            }}
            className="overflow-x-hidden flex gap-2 rounded-xl photo-shadow"
          >
            {photos.map((photoUrl, i) => (
              <li
                key={i}
                className="h-[215px] w-full flex justify-center items-center flex-shrink-0 rounded-xl"
              >
                <img
                  src={urlJoin(AWS_BASE_URL || '', photoUrl)}
                  alt="soldier photo"
                  className="h-[215px] w-full object-cover rounded-xl"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};
