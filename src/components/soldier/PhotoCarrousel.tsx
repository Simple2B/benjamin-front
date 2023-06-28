import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';

type Props = {};

const photos = [
  {
    phtoUrl:
      'https://i.pinimg.com/736x/3f/5c/57/3f5c576bf6002ebb0513f5b650df291d.jpg',
  },
  {
    phtoUrl:
      'https://i.pinimg.com/564x/9a/8c/d4/9a8cd4a8cf26cf3b1f422d39e0697a05.jpg',
  },
  {
    phtoUrl:
      'https://i.pinimg.com/564x/2f/cb/76/2fcb76ac0eabfa6c6f5d3bd6d90b3678.jpg',
  },
  {
    phtoUrl:
      'https://i.pinimg.com/564x/05/90/eb/0590eb721b049c4b5f9eab553d544e5b.jpg',
  },
  {
    phtoUrl:
      'https://i.pinimg.com/736x/b8/ef/cc/b8efcccc2f34afcb6fc226e4c7161ace.jpg',
  },
];

export const PhotoCarrousel = (props: Props) => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  return (
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
        {photos.map(({ phtoUrl }, i) => (
          <li
            key={i}
            className="h-[215px] w-full flex justify-center items-center flex-shrink-0 rounded-xl"
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
