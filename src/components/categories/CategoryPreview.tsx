'use client';
import { SoldierFilters } from '@/openapi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import urlJoin from 'url-join';
import IconButton from '../IconButton';
import { MONTH, MONTHS_BY_NUMBER } from '../constants/constants';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';
import { QUERY_PARAMS } from '../constants/queryParams';
import { CategoryBlock } from './CategoryBlock';
import { FilteredCategoryExample } from './FilteredCategoryExample';

type ICategoryPreviewProps = {
  categoriesValues: SoldierFilters;
  cemeteryUuid: string;
};

export const CategoryPreview = ({
  categoriesValues,
  cemeteryUuid,
}: ICategoryPreviewProps) => {
  const router = useRouter();

  const date = new Date();
  const todayDay = date.getDate();
  const todayMonthText = MONTHS_BY_NUMBER[date.getMonth() + 1];
  const todayMonthNumber = date.getMonth() + 1;

  return (
    <div className="flex flex-col items-start m-6 gap-5 bg-white">
      <div
        className="w-full flex items-center justify-between "
        onClick={router.back}
      >
        <IconButton
          iconName={ICONS_NAME.navigateBack}
          className="ml-2 w-6 h-6 rotate-180"
        />
        <h1 className="text-xl font-semibold flex-grow text-center mr-5">
          Filters
        </h1>
      </div>

      <div className="flex flex-col items-start mx-2 gap-6 bg-white">
        <div className="flex gap-2 flex-wrap">
          {categoriesValues.todayDeathdaySoldiers && (
            <Link
              href={{
                pathname: urlJoin(PATH.cemetery, cemeteryUuid),
                query: { deathMonth: todayMonthNumber, deathDay: todayDay },
              }}
            >
              <FilteredCategoryExample
                categoryText={`Died on ${todayMonthText} ${todayDay}th`}
              />
            </Link>
          )}
          {categoriesValues.todayBirthdaySoldiers && (
            <Link
              href={{
                pathname: urlJoin(PATH.cemetery, cemeteryUuid),
                query: { birthMonth: todayMonthNumber, birthDay: todayDay },
              }}
            >
              <FilteredCategoryExample
                categoryText={`Born on ${todayMonthText} ${todayDay}th`}
              />
            </Link>
          )}

          <Link
            href={{
              pathname: urlJoin(PATH.cemetery, cemeteryUuid),
              query: { isHeadstoneChanged: true },
            }}
          >
            <FilteredCategoryExample
              categoryText={`Operation Benjamin Headstone Changes`}
            />
          </Link>
        </div>
        {categoriesValues.birthYearFilters.length > 0 && (
          <CategoryBlock
            categoryHeader={'Birth year'}
            categoryText={categoriesValues.birthYearFilters}
            queryParam={QUERY_PARAMS.birthYear}
            cemeteryUuid={cemeteryUuid}
          />
        )}
        {categoriesValues.birthMonthFilters.length > 0 && (
          <CategoryBlock
            categoryHeader={'Birth month'}
            categoryText={categoriesValues.birthMonthFilters}
            queryParam={QUERY_PARAMS.birthMonth}
            cemeteryUuid={cemeteryUuid}
          />
        )}
        {categoriesValues.stateFilters.length > 0 && (
          <CategoryBlock
            categoryHeader={'Enlisted from'}
            categoryText={categoriesValues.stateFilters}
            queryParam={QUERY_PARAMS.statesEnteredFrom}
            cemeteryUuid={cemeteryUuid}
          />
        )}
        {categoriesValues.deathMonthFilters.length > 0 && (
          <CategoryBlock
            categoryHeader={'Month died'}
            categoryText={categoriesValues.deathMonthFilters}
            queryParam={QUERY_PARAMS.deathMonth}
            cemeteryUuid={cemeteryUuid}
          />
        )}
        {categoriesValues.deathYearFilters.length > 0 && (
          <CategoryBlock
            categoryHeader={'Year died'}
            categoryText={categoriesValues.deathYearFilters}
            queryParam={QUERY_PARAMS.deathYear}
            cemeteryUuid={cemeteryUuid}
          />
        )}
        {categoriesValues.rankFilters.length > 0 && (
          <CategoryBlock
            categoryHeader={'Rank'}
            categoryText={categoriesValues.rankFilters}
            queryParam={QUERY_PARAMS.rank}
            cemeteryUuid={cemeteryUuid}
          />
        )}
        {categoriesValues.unitsFilters.length > 0 && (
          <CategoryBlock
            categoryHeader={'Unit'}
            categoryText={categoriesValues.unitsFilters}
            queryParam={QUERY_PARAMS.unit}
            cemeteryUuid={cemeteryUuid}
          />
        )}
      </div>
    </div>
  );
};
