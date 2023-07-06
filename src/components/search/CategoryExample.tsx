import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';
import Link from 'next/link';
import urlJoin from 'url-join';
import { useAppStore } from '@/lib/slices/store';

export const CategoryExample = () => {
  const { currentCemetery } = useAppStore();

  const filterExamples = [
    {
      iconName: ICONS_NAME.locationPin,
      iconDescription: 'Born in New York',
      queryParam: 'birthLocation',
      value: 'New York',
    },
    {
      iconName: ICONS_NAME.calendar,
      iconDescription: 'Born in April',
      queryParam: 'deathMonth',
      value: 'April',
    },
    {
      iconName: ICONS_NAME.calendar,
      iconDescription: 'Born in 1924',
      queryParam: 'birthYear',
      value: '1924',
    },
    {
      iconName: ICONS_NAME.calendar,
      iconDescription: 'Born in June',
      queryParam: 'birthMonth',
      value: 'June',
    },
  ];

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-4  text-indigo-100 mt-5">
        {filterExamples.map(
          ({ iconName, iconDescription, queryParam, value }, index) => (
            <Link
              href={{
                pathname: currentCemetery
                  ? urlJoin(PATH.cemetery, currentCemetery.uuid)
                  : PATH.location,
                query: { [queryParam]: value },
              }}
              key={index}
            >
              <div>
                <div
                  className={`bg-opacity-20  bg-turquoise-50 h-8 pl-[10px] pr-3 flex gap-3 justify-center items-center rounded-2xl whitespace-nowrap flex-shrink-0 overflow-hidden ${
                    index == 0 ? 'ml-[calc((100vw-350px)/2)]' : ''
                  }`}
                >
                  <IconButton iconName={iconName} className="h-3 w-3" />
                  <p className="text-sm leading-5">{iconDescription}</p>
                </div>
              </div>
            </Link>
          )
        )}
        <Link href={PATH.category}>
          <div className="bg-opacity-20  bg-turquoise-50 h-8 pl-[10px] pr-3 flex gap-3 justify-center items-center rounded-2xl whitespace-nowrap flex-shrink-0 overflow-hidden mr-[calc((100vw-350px)/2)]">
            <IconButton iconName={ICONS_NAME.ellipsis} className="h-3 w-3" />
            <p className="text-sm leading-5">More</p>
          </div>
        </Link>
      </div>
    </>
  );
};
