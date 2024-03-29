'use client';

import { useAppStore } from '@/lib/slices/store';
import { CemeteryOut, SoldierOut } from '@/openapi';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import {
  ICoordinates,
  getZoomLevel,
} from '../cemetery/mapCemetery/mapCemetery.utils';
import { PATH } from '../constants/path.constants';
import SoldierInfo from './SoldierInfo';

export type ISolderPhotoGallery = {
  uuid: string;
  photoUrl: string;
  name: string;
};

interface ICemeterySoldier {
  cemetery: CemeteryOut;
  soldier: SoldierOut;
}

const MapCemetery = dynamic(
  () => import('../cemetery/mapCemetery/MapCemetery'),
  {
    ssr: false,
  }
);

export default function PreviewCemeterySoldier({
  cemetery,
  soldier,
}: ICemeterySoldier) {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const {
    currentCemetery,
    setCurrentCemetery,
    currentMapPosition,
    currenSoldierScroll,
    setCurrentSoldierScroll,
  } = useAppStore();

  useEffect(() => {
    if (currenSoldierScroll) {
      const mainPage = document.getElementById('page') as HTMLElement;
      mainPage.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth',
      });
      setCurrentSoldierScroll(false);
    }
  }, []);

  useEffect(() => {
    setCurrentCemetery(cemetery);
  }, [cemetery]);

  if (!cemetery) {
    redirect(PATH.location);
  }
  if (!soldier) {
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
          center={
            currentMapPosition?.latlng ? currentMapPosition.latlng : center
          }
          graves_coordinates={cemetery?.graves_coordinates}
          cemeteryUuid={cemetery?.uuid}
          zoom={currentMapPosition ? currentMapPosition.zoom : suitabbleZoom}
          soldierUuid={soldier.uuid}
          isTerrianView={currentMapPosition?.isTerrian ?? true}
        />
        <div className="flex flex-col items-center w-full fixed z-20">
          <SearchBar setInputSoldier={setInputSoldier} displaySettings={true} />
        </div>
      </div>

      <SoldierInfo soldier={soldier} />
    </div>
  );
}
