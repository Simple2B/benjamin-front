'use client';
import React, { useState, useEffect } from 'react';
import MapCemetery, { ICoordinates } from './MapCemetery';
import SearchBar from '../SearchBar';
import { redirect } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryInfo } from './cemeteryInfo';
import { FilteredSoldiers } from './FilteredSoldiers';
import { useSearchParams } from 'next/navigation';
import { CemeteriesService, CemeteryOut } from '@/openapi';
import { useQuery } from '@tanstack/react-query';
import SearchFilterBar from '../SearchFilterBar';

const MONTHS: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export type ISolderPhotoGallery = {
  uuid: string;
  photoUrl: string;
  name: string;
};

export default function PreviewCemetery() {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const { currentCemetery, currentFilteredSoldiers } = useAppStore();
  const [isFilter, setFilter] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const birthDay = searchParams.get('birthDay');
  const birthMonth = searchParams.get('birthMonth');
  const birthYear = searchParams.get('birthYear');
  const deathDay = searchParams.get('deathDay');
  const deathMonth = searchParams.get('deathMonth');
  const deathYear = searchParams.get('deathYear');
  const birthLocation = searchParams.get('birthLocation');

  useEffect(() => {
    if (
      !birthDay &&
      !birthMonth &&
      !birthYear &&
      !deathDay &&
      !deathMonth &&
      !deathYear &&
      !birthLocation
    ) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, []);

  const soldiersQuery = useQuery(
    [
      birthLocation,
      birthMonth,
      birthDay,
      birthYear,
      deathMonth,
      deathDay,
      deathYear,
    ],
    () =>
      CemeteriesService.getCemeterySoldiers(
        (currentCemetery as CemeteryOut).uuid,
        undefined,
        birthYear ? parseInt(birthYear) : undefined,
        birthMonth ? MONTHS[birthMonth] : undefined,
        birthDay ? parseInt(birthDay) : undefined,
        deathYear ? parseInt(deathYear) : undefined,
        deathMonth ? MONTHS[deathMonth] : undefined,
        deathDay ? parseInt(deathDay) : undefined,
        birthLocation ? birthLocation : undefined,
        1,
        10
      ),
    {
      enabled: !!currentCemetery,
    }
  );

  if (!currentCemetery) {
    redirect(PATH.location);
  }

  const center: ICoordinates = {
    lat: currentCemetery?.latitude ?? 45,
    lng: currentCemetery?.longitude ?? 45,
  };

  const markers = currentCemetery?.filtered_soldiers?.soldiers.map(
    (soldier) => {
      return {
        lat: soldier.burialLocationLatitude ?? 45,
        lng: soldier.burialLocationLongitude ?? 45,
      };
    }
  );

  return (
    <div>
      <div className={`flex flex-col items-baseline w-full bg-white h-full`}>
        <div className="fixed w-screen">
          <MapCemetery center={center} markers={markers ? markers : []} />
          <div className="flex flex-col items-center">
            {soldiersQuery.isFetched && isFilter ? (
              <SearchFilterBar
                filterText={[
                  birthDay,
                  birthMonth,
                  birthYear,
                  deathDay,
                  deathMonth,
                  deathYear,
                  birthLocation,
                ]}
                setFilter={setFilter}
              />
            ) : (
              <SearchBar
                setInputSoldier={setInputSoldier}
                displaySettings={true}
              />
            )}
          </div>
        </div>
      </div>
      {soldiersQuery.data?.items.length && isFilter ? (
        <FilteredSoldiers
          filterResult={soldiersQuery.data.items}
          isFetched={soldiersQuery.isFetched}
          filterText={[
            birthDay,
            birthMonth,
            birthYear,
            deathDay,
            deathMonth,
            deathYear,
            birthLocation,
          ]}
        />
      ) : (
        <CemeteryInfo cemetery={currentCemetery} />
      )}
    </div>
  );
}
