'use client';
import React, { useState, useEffect } from 'react';
import { ICoordinates } from '../mapCemetery/MapCemetery';
import SearchBar from '../../SearchBar';
import { redirect } from 'next/navigation';
import { PATH } from '../../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryInfo } from '../CemeteryInfo';
import { FilteredSoldiers } from '../FilteredSoldiers';
import { useSearchParams } from 'next/navigation';
import { CemeteriesService, CemeteryOut } from '@/openapi';
import { useQuery } from '@tanstack/react-query';
import SearchFilterBar from '../../SearchFilterBar';
import { MONTHS_BY_NUMBER } from '../../constants/constants';
import { getFilterTitle } from './PreviewCementery.utils';
import dynamic from 'next/dynamic';
import { TipsController } from '../tips/TipsController';
import { getZoomLevel } from '../mapCemetery/mapCemetery.utils';

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

  const searchParams = useSearchParams();

  const { setCurrentMapPosition, currentMapPosition } = useAppStore();
  useEffect(() => {
    if (currentMapPosition) {
      const mapPosition = {
        zoom: getZoomLevel(cemetery?.graves_coordinates),
        latlng: undefined,
        isTerrian: true,
      };
      setCurrentMapPosition(mapPosition);
    }
  }, []);

  const birthDay = searchParams.get('birthDay');
  const birthMonth = searchParams.get('birthMonth');
  const birthYear = searchParams.get('birthYear');
  const deathDay = searchParams.get('deathDay');
  const deathMonth = searchParams.get('deathMonth');
  const deathYear = searchParams.get('deathYear');
  const birthLocation = searchParams.get('birthLocation');
  const isHeadstoneChanged = searchParams.get('isHeadstoneChanged');
  const statesEnteredFrom = searchParams.get('statesEnteredFrom');
  const rank = searchParams.get('rank');
  const unit = searchParams.get('unit');

  const values: (string | null)[] = [
    birthDay,
    birthMonth ? MONTHS_BY_NUMBER[parseInt(birthMonth)] : null,
    birthYear,
    deathDay,
    deathMonth ? MONTHS_BY_NUMBER[parseInt(deathMonth)] : null,
    deathYear,
    birthLocation,
    isHeadstoneChanged,
    statesEnteredFrom,
    rank,
    unit,
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
      !statesEnteredFrom &&
      !rank &&
      !unit
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
      rank,
      unit,
    ],
    () =>
      CemeteriesService.getCemeterySoldiers(
        (cemetery as CemeteryOut).uuid,
        undefined,
        birthYear ? parseInt(birthYear) : undefined,
        birthMonth ? parseInt(birthMonth) : undefined,
        birthDay ? parseInt(birthDay) : undefined,
        deathYear ? parseInt(deathYear) : undefined,
        deathMonth ? parseInt(deathMonth) : undefined,
        deathDay ? parseInt(deathDay) : undefined,
        isHeadstoneChanged ? !!isHeadstoneChanged : undefined,
        statesEnteredFrom ? statesEnteredFrom : undefined,
        birthLocation ? birthLocation : undefined,
        rank ? rank : undefined,
        unit ? unit : undefined
      ),
    {
      enabled: !!cemetery,
    }
  );

  if (!cemetery) {
    redirect(PATH.location);
  }

  const center: ICoordinates = {
    lat: currentCemetery?.latitude ?? 45,
    lng: currentCemetery?.longitude ?? 45,
  };

  const suitabbleZoom = getZoomLevel(cemetery?.graves_coordinates);

  return (
    <div className="w-screen">
      <div className="absolute">
        <MapCemetery
          center={center}
          graves_coordinates={cemetery?.graves_coordinates}
          cemeteryUuid={cemetery?.uuid}
          zoom={suitabbleZoom}
          soldierUuid=""
          isTerrianView={true}
        />
        <div className="flex flex-col items-center w-full fixed z-20">
          {soldiersQuery.isFetched && isFilter ? (
            <SearchFilterBar
              filterText={getFilterTitle(values)}
              setFilter={setFilter}
            />
          ) : (
            <>
              <SearchBar
                setInputSoldier={setInputSoldier}
                displaySettings={true}
              />
              <TipsController />
            </>
          )}
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
