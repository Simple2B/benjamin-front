'use client';
import React, { useState, useEffect } from 'react';
import MapCemetery, { ICoordinates } from '../MapCemetery';
import SearchBar from '../../SearchBar';
import { redirect } from 'next/navigation';
import { PATH } from '../../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryInfo } from '../cemeteryInfo';
import { FilteredSoldiers } from '../FilteredSoldiers';
import { useSearchParams } from 'next/navigation';
import { CemeteriesService, CemeteryOut, Grave } from '@/openapi';
import { useQuery } from '@tanstack/react-query';
import SearchFilterBar from '../../SearchFilterBar';
import { MONTHS } from '../../constants/constants';
import { getFilterTitle } from './PreviewCementery.utils';

export type ISolderPhotoGallery = {
  uuid: string;
  photoUrl: string;
  name: string;
};

export default function PreviewCemetery() {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const { currentCemetery, currentFilteredSoldiers } = useAppStore();
  const [isFilter, setFilter] = useState<boolean>(true);
  const [gravesCoordinates, setGravesCoordinates] = useState<Grave[]>([]);
  const searchParams = useSearchParams();

  const birthDay = searchParams.get('birthDay');
  const birthMonth = searchParams.get('birthMonth');
  const birthYear = searchParams.get('birthYear');
  const deathDay = searchParams.get('deathDay');
  const deathMonth = searchParams.get('deathMonth');
  const deathYear = searchParams.get('deathYear');
  const birthLocation = searchParams.get('birthLocation');

  const values: (string | null)[] = [
    birthLocation,
    birthMonth,
    birthDay,
    birthYear,
    deathMonth,
    deathDay,
    deathYear,
  ];

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
  useEffect(() => {
    if (soldiersQuery.data?.items.length && isFilter) {
      const graveMarkers: Grave[] = soldiersQuery.data?.items.map(
        ({
          uuid,
          suffix,
          firstName,
          lastName,
          burialLocationLatitude,
          burialLocationLongitude,
        }) => {
          return {
            uuid,
            suffix,
            firstName,
            lastName,
            burialLocationLatitude,
            burialLocationLongitude,
          };
        }
      );
      setGravesCoordinates(graveMarkers);
    } else {
      setGravesCoordinates(currentCemetery?.graves_coordinates);
    }
  }, [isFilter]);

  const center: ICoordinates = {
    lat: currentCemetery?.latitude ?? 45,
    lng: currentCemetery?.longitude ?? 45,
  };

  return (
    <div>
      <div className={`flex flex-col items-baseline w-full bg-white h-full`}>
        <div className="fixed w-screen">
          <MapCemetery center={center} graves_coordinates={gravesCoordinates} />
          <div className="flex flex-col items-center">
            {soldiersQuery.isFetched && isFilter ? (
              <SearchFilterBar
                filterText={getFilterTitle(values)}
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
          filterText={getFilterTitle(values)}
        />
      ) : (
        <CemeteryInfo cemetery={currentCemetery} />
      )}
    </div>
  );
}
