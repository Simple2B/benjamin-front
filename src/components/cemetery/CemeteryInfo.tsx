import { useEffect, useRef, useState } from 'react';
import HorizontalPhotoGallery from './HorizontalPhotoGallery';
import CemeteryAdditionalInfo from './cemeteryAdditionalInfo/CemeteryAdditionalInfo';
import { CemeteryAudioBox } from './cemeteryMainInfo/CemeteryAudioBox';
import CemeteryMainInfo from './cemeteryMainInfo/CemeteryMainInfo';
import { CemeteryOut } from '@/openapi';
import { redirect } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import { CemeteryAbmc } from './cemeteryAbmc/CemeteryAbmc';

interface ICemeteryInfoProps {
  cemetery: CemeteryOut;
}

export const CemeteryInfo = ({ cemetery }: ICemeteryInfoProps) => {
  const cemeteryMainInfoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragEnd, setIsDragEnd] = useState(false);

  const startDragging = () => {
    setIsDragging(true);
    setIsDragEnd(false);
  };

  const stopDragging = () => {
    if (!isDragging) return;
    setIsDragEnd(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isDragEnd) {
      if (isDragging) {
        timeoutId = setTimeout(() => {
          setIsDragging(false);
        }, 700);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDragEnd]);

  if (!cemetery) {
    redirect(PATH.location);
  }

  return (
    <div
      className={`absolute inset-0 scroll-container h-full z-20 ${
        !isDragging && 'pointer-events-none'
      }`}
    >
      <div
        className="relative z-50 scroll-area pointer-events-none"
        ref={mapRef}
      >
        <p className="h-[calc(100vh-230px)] w-screen  border-4 border-rose-600"></p>{' '}
      </div>
      <div
        className="absolute top-0 w-screen z-50 bg-white rounded-t-xl scroll-area min-h-screen scrollable-content-cemetery mt-[calc(100vh-230px)]"
        ref={cemeteryMainInfoRef}
        id="scrollable-content"
        onTouchStart={startDragging}
        onTouchEnd={stopDragging}
      >
        <CemeteryMainInfo
          name={cemetery.name}
          location={cemetery.location ? cemetery.location : ''}
          phone={cemetery.phone}
          email={cemetery.email}
          webUrl={cemetery.webUrl}
        />
        {cemetery.audio_tours.length ? (
          <CemeteryAudioBox audio_tours={cemetery.audio_tours} />
        ) : null}

        <div className="flex flex-col gap-6 items-center w-full px-6 z-10 bg-white pt-5 relative">
          <CemeteryAdditionalInfo
            superintendent={cemetery.superintendent}
            war={cemetery.war}
            numberOfSoldiersBuried={cemetery.amountBuriedSoldiersCommon}
            numberOfJewishSoldiersBuried={cemetery.amountBuriedSoldiersJewish}
            listedAsMissingSoldiers={cemetery.amountBuriedSoldiersMissing}
          />
        </div>
        <CemeteryAbmc />
        <div className="relative flex flex-col gap-6 items-center pb-8 w-full z-10 bg-white pt-6">
          {cemetery.filtered_soldiers && (
            <>
              <HorizontalPhotoGallery
                text={'Soldiers with Headstone Changes'}
                solders={cemetery.soldies_headstones_changed}
                className="z-10"
                dash={
                  cemetery.soldies_headstones_changed.length > 0 &&
                  cemetery.filtered_soldiers.soldiers.length > 0
                }
              />
              <HorizontalPhotoGallery
                text={cemetery.filtered_soldiers.title}
                solders={cemetery.filtered_soldiers.soldiers}
                className="z-10"
                dash={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
