'use client';
import React, { useEffect } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useRouter } from 'next/navigation';
import { FilteredCategoryExample } from './FilteredCategoryExample';
import { CategoryBlock } from './CategoryBlock';
import { MONTH } from '../constants/constants';
import { useAppStore } from '@/lib/slices/store';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import Link from 'next/link';

const YEAR = ['1920', '1921', '1922', '1923', '1924', '1925', '1926'];

const CITY = ['New York', 'California', 'Delaware'];

export const CategoryPreview = () => {
  const { currentCemetery } = useAppStore();

  useEffect(() => {
    if (!currentCemetery) {
      router.push(PATH.location);
    }
  }, []);

  const router = useRouter();

  const date = new Date();
  const todayDay = date.getDate();
  const todayMonth = MONTH[date.getMonth()];

  return (
    <div className="flex flex-col items-start m-6 gap-5 bg-white">
      <div
        className="w-full flex items-baseline justify-between"
        onClick={router.back}
      >
        <IconButton
          iconName={ICONS_NAME.selectingArrow}
          className="ml-2 w-4 h-4 rotate-180"
        />
        <h1 className="text-2xl font-semibold flex-grow text-center font-rajdhani">
          Categories
        </h1>
      </div>

      <div className="flex flex-col items-start mx-2 gap-6 bg-white">
        {currentCemetery && (
          <div className="flex gap-2">
            <Link
              href={{
                pathname: urlJoin(PATH.cemetery, currentCemetery.uuid),
                query: { deathMonth: todayMonth, deathDay: todayDay },
              }}
            >
              <FilteredCategoryExample
                categoryText={`Died on ${todayMonth} ${todayDay}th`}
              />
            </Link>

            <Link
              href={{
                pathname: urlJoin(PATH.cemetery, currentCemetery.uuid),
                query: { birthMonth: todayMonth, birthDay: todayDay },
              }}
            >
              <FilteredCategoryExample
                categoryText={`Born on ${todayMonth} ${todayDay}th`}
              />
            </Link>
          </div>
        )}
        <CategoryBlock
          categoryHeader={'Birth year'}
          categoryText={YEAR}
          queryParam={'birthYear'}
        />
        <CategoryBlock
          categoryHeader={'Birth month'}
          categoryText={MONTH}
          queryParam={'birthMonth'}
        />
        <CategoryBlock
          categoryHeader={'Enlisted from'}
          categoryText={CITY}
          queryParam={'birthLocation'}
        />
        <CategoryBlock
          categoryHeader={'Month died'}
          categoryText={MONTH}
          queryParam={'deathMonth'}
        />
        <CategoryBlock
          categoryHeader={'Year died'}
          categoryText={YEAR}
          queryParam={'deathYear'}
        />
      </div>
    </div>
  );
};
