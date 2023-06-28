import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

type Props = {};

const photos = [
  {
    phtoUrl:
      'https://i.pinimg.com/564x/bb/da/42/bbda42147aea582a703f22126f5e0e26.jpg',
  },
  {
    phtoUrl:
      'https://i.pinimg.com/564x/f4/1b/3a/f41b3abe5c74207b43ee9cab4ceee061.jpg',
  },
  {
    phtoUrl:
      '    https://i.pinimg.com/564x/2f/1e/a4/2f1ea45079348dc81e9499519e25b42f.jpg',
  },
  {
    phtoUrl:
      'https://i.pinimg.com/564x/bb/da/42/bbda42147aea582a703f22126f5e0e26.jpg',
  },
];

export const PhotoCarrousel = (props: Props) => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  return (
    <div className="rounded-xl mt-3">
      <p className="text-sm text-grey-20 leading-7">Photos</p>

      <ul
        ref={scrollRef}
        style={{
          scrollSnapType: 'x mandatory',
        }}
        className="overflow-x-hidden flex gap-2"
      >
        <div className="flex justify-center items-center gap-60 mt-[100px] absolute w-[318px]">
          <button onClick={() => prev()}>
            <IconButton
              iconName={ICONS_NAME.selectingArrow}
              className="w-4 h-4 rotate-180"
            />
          </button>
          <button onClick={() => next()}>
            <IconButton
              iconName={ICONS_NAME.selectingArrow}
              className="w-4 h-4"
            />
          </button>
        </div>
        {photos.map(({ phtoUrl }, i) => (
          <li
            key={i}
            className="h-[215px] w-full flex justify-center items-center flex-shrink-0"
          >
            <img
              src={phtoUrl}
              alt="soldier photo"
              className="h-[215px] w-full object-cover rounded-xl"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
