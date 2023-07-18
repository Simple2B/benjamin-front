'use client';
import React, { useState, useEffect } from 'react';
import { ICoordinates } from '../mapCemetery/MapCemetery';
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
import dynamic from 'next/dynamic';

export type ISolderPhotoGallery = {
  uuid: string;
  photoUrl: string;
  name: string;
};

interface ISoldier {
  cemetery: CemeteryOut;
}

const MapCemetery = dynamic(() => import('../mapCemetery/MapCemetery'), {
  ssr: false,
});

export default function PreviewCemetery({ cemetery }: ISoldier) {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const { currentCemetery, setCurrentCemetery } = useAppStore();
  const [isFilter, setFilter] = useState<boolean>(false);
  const [gravesCoordinates, setGravesCoordinates] = useState<Grave[]>([]);
  const searchParams = useSearchParams();

  const birthDay = searchParams.get('birthDay');
  const birthMonth = searchParams.get('birthMonth');
  const birthYear = searchParams.get('birthYear');
  const deathDay = searchParams.get('deathDay');
  const deathMonth = searchParams.get('deathMonth');
  const deathYear = searchParams.get('deathYear');
  const birthLocation = searchParams.get('birthLocation');
  const isHeadstoneChanged = searchParams.get('isHeadstoneChanged');
  const statesEnteredFrom = searchParams.get('statesEnteredFrom');

  const values: (string | null)[] = [
    birthLocation,
    birthMonth,
    birthDay,
    birthYear,
    deathMonth,
    deathDay,
    deathYear,
    isHeadstoneChanged,
    statesEnteredFrom,
  ];

  useEffect(() => {
    setCurrentCemetery(cemetery);
  }, [cemetery]);

  useEffect(() => {
    setFilter(false);
    if (
      !birthDay &&
      !birthMonth &&
      !birthYear &&
      !deathDay &&
      !deathMonth &&
      !deathYear &&
      !birthLocation &&
      !isHeadstoneChanged &&
      !statesEnteredFrom
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
      isHeadstoneChanged,
      statesEnteredFrom,
    ],
    () =>
      CemeteriesService.getCemeterySoldiers(
        (cemetery as CemeteryOut).uuid,
        undefined,
        birthYear ? parseInt(birthYear) : undefined,
        birthMonth ? MONTHS[birthMonth] : undefined,
        birthDay ? parseInt(birthDay) : undefined,
        deathYear ? parseInt(deathYear) : undefined,
        deathMonth ? MONTHS[deathMonth] : undefined,
        deathDay ? parseInt(deathDay) : undefined,
        isHeadstoneChanged ? !!isHeadstoneChanged : undefined,
        statesEnteredFrom ? statesEnteredFrom : undefined,
        birthLocation ? birthLocation : undefined
      ),
    {
      enabled: !!cemetery,
    }
  );

  if (!cemetery) {
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
      setGravesCoordinates(cemetery?.graves_coordinates);
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
      {isFilter ? (
        <FilteredSoldiers
          filterResult={soldiersQuery.data ? soldiersQuery.data.items : []}
          isFetched={soldiersQuery.isFetched}
          filterText={getFilterTitle(values)}
          cemetery={cemetery}
        />
      ) : (
        <CemeteryInfo cemetery={cemetery} />
      )}
    </div>
  );
}
