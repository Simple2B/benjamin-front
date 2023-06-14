'use client';
import React from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useRouter } from 'next/navigation';
import { FilteredCategoryExample } from './FilteredCategoryExample';
import { CategoryBlock } from './CategoryBlock';
import { MONTH } from '../constants/constants';

const YEAR = ['1920', '1921', '1922', '1923', '1924', '1295', '1926'];

const CITY = ['New York', 'California', 'Delaware'];

export const CategoryPreview = () => {
  const router = useRouter();

  const date = new Date();
  const todayDay = date.getDate();
  const todayMonth = MONTH[date.getMonth()];

  console.log(todayMonth, todayDay);
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
        <div className="flex gap-2">
          <FilteredCategoryExample
            categoryText={`Died on ${todayMonth} ${todayDay}th`}
          />
          <FilteredCategoryExample
            categoryText={`Born on ${todayMonth} ${todayDay}th`}
          />
        </div>
        <CategoryBlock categoryHeader={'Birth year'} categoryText={YEAR} />
        <CategoryBlock categoryHeader={'Birth month'} categoryText={MONTH} />
        <CategoryBlock categoryHeader={'Enlisted from'} categoryText={CITY} />
        <CategoryBlock categoryHeader={'Month died'} categoryText={MONTH} />
        <CategoryBlock categoryHeader={'Year died'} categoryText={YEAR} />
      </div>
    </div>
  );
};
