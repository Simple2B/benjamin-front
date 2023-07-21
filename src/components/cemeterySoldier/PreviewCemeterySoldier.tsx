'use client';

import { useAppStore } from '@/lib/slices/store';
import { CemeteryOut, Grave, SoldierOut } from '@/openapi';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import { CemeteryInfo } from '../cemetery/cemeteryInfo';
import { ICoordinates } from '../cemetery/mapCemetery/mapCemetery.utils';
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
  const { currentCemetery, setCurrentCemetery, currentMapPosition } =
    useAppStore();

  console.log({ currentMapPosition });

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

  return (
    <div>
      <div className={`flex flex-col items-baseline w-full bg-white h-full`}>
        <div className="fixed w-screen">
          <MapCemetery
            center={currentMapPosition ? currentMapPosition.latlng : center}
            graves_coordinates={cemetery?.graves_coordinates}
            cemeteryUuid={cemetery?.uuid}
            zoom={currentMapPosition ? currentMapPosition.zoom : 13}
          />
          <div className="flex flex-col items-center">
            <SearchBar
              setInputSoldier={setInputSoldier}
              displaySettings={true}
            />
          </div>
        </div>
      </div>

      <SoldierInfo soldier={soldier} />
    </div>
  );
}
