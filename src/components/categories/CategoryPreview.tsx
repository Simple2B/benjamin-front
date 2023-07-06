'use client';
import React, { useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useRouter } from 'next/navigation';
import { FilteredCategoryExample } from './FilteredCategoryExample';
import { CategoryBlock } from './CategoryBlock';
import { MONTH } from '../constants/constants';
import { useQuery } from '@tanstack/react-query';
import { CemeteriesService, CemeteryOut } from '@/openapi';
import { useAppStore } from '@/lib/slices/store';

const YEAR = ['1920', '1921', '1922', '1923', '1924', '1295', '1926'];

const CITY = ['New York', 'California', 'Delaware'];

export const CategoryPreview = () => {
  const [birthDay, setBirthDay] = useState<number | undefined>(undefined);
  const [birthMonth, setBirthMonth] = useState<number | undefined>(undefined);
  const [birthYear, setBirthYear] = useState<number | undefined>(undefined);
  const [deathDay, setDeathDay] = useState<number | undefined>(undefined);
  const [deathMonth, setDeathMonth] = useState<number | undefined>(undefined);
  const [deathYear, setDeathYear] = useState<number | undefined>(undefined);
  const [birthLocation, setBirthLocation] = useState<string | undefined>(
    undefined
  );

  const { currentCemetery } = useAppStore();

  const soldiersQuery = useQuery(
    ['birth_mouth', 'April'],
    () =>
      CemeteriesService.getCemeterySoldiers(
        (currentCemetery as CemeteryOut).uuid,
        undefined,
        birthYear,
        birthMonth,
        birthDay,
        deathYear,
        deathMonth,
        deathDay,
        birthLocation,
        1,
        500
      ),
    {
      enabled: !!currentCemetery,
    }
  );

  const handleSetTodayDeathDate = () => {
    setDeathDay(new Date().getDate());
    setDeathMonth(new Date().getMonth() + 1);
  };

  const handleSetTodayBirthDate = () => {
    setBirthDay(new Date().getDate());
    setBirthMonth(new Date().getMonth() + 1);

    if (soldiersQuery.isFetched) {
      if (soldiersQuery.data && currentCemetery) {
        console.log('soldiersQuery.data', soldiersQuery.data);
      }
    }
  };

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
        <div className="flex gap-2">
          <div onClick={handleSetTodayDeathDate}>
            <FilteredCategoryExample
              categoryText={`Died on ${todayMonth} ${todayDay}th`}
            />
          </div>
          <div onClick={handleSetTodayBirthDate}>
            <FilteredCategoryExample
              categoryText={`Born on ${todayMonth} ${todayDay}th`}
            />
          </div>
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
