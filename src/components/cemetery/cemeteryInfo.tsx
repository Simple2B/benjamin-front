import { useRef, useState, useEffect } from 'react';
import HorizontalPhotoGallery from './HorizontalPhotoGallery';
import CemeteryAdditionalInfo from './cemeteryAdditionalInfo/CemeteryAdditionalInfo';
import { CemeteryAudioBox } from './cemeteryMainInfo/CemeteryAudioBox';
import CemeteryMainInfo from './cemeteryMainInfo/CemeteryMainInfo';
import { CemeteryOut } from '@/openapi';

interface ICemeteryInfoProps {
  cemetery: CemeteryOut;
}

export const CemeteryInfo = ({ cemetery }: ICemeteryInfoProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.addEventListener('touchstart', (e) => {
        const currentYPos = (
          e.currentTarget as Element
        )?.getBoundingClientRect().y;
        setTouchStart(currentYPos);
      });

      scrollRef.current?.addEventListener('touchend', (e) => {
        const currentYPos = (
          e.currentTarget as Element
        )?.getBoundingClientRect().y;

        if (currentYPos > touchStart) {
          document.getElementById('page')?.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          document.getElementById('page')?.scrollTo({
            top: 1000,
            left: 0,
            behavior: 'smooth',
          });
        }
      });

      onwheel = (event: WheelEvent) => {
        if (event.deltaY > 0) {
          document.getElementById('page')?.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
        if (event.deltaY < 0) {
          document.getElementById('cemetery-scrollable')?.scrollIntoView({
            behavior: 'smooth',
          });
        }
      };
    }
  }, [scrollRef, touchStart]);

  return (
    <div
      className="relative w-full z-10 bg-white rounded-t-xl"
      id="cemetery-scrollable"
      ref={scrollRef}
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

      <div className="flex flex-col gap-6 items-center w-full px-6 z-10 bg-white pt-5">
        <CemeteryAdditionalInfo
          superintendent={cemetery.superintendent}
          war={cemetery.war}
          numberOfSoldiersBuried={cemetery.amountBuriedSoldiersCommon}
          numberOfJewishSoldiersBuried={cemetery.amountBuriedSoldiersJewish}
          listedAsMissingSoldiers={cemetery.amountBuriedSoldiersMissing}
        />
      </div>

      <div className="relative flex flex-col gap-6 items-center pb-8 w-full z-10 bg-white pt-6">
        {cemetery.filtered_soldiers && (
          <HorizontalPhotoGallery
            text={cemetery.filtered_soldiers.title}
            solders={cemetery.filtered_soldiers.soldiers}
            className="z-10"
          />
        )}
      </div>
    </div>
  );
};
