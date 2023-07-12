import { useRef, useState, useEffect } from 'react';
import HorizontalPhotoGallery from './HorizontalPhotoGallery';
import CemeteryAdditionalInfo from './cemeteryAdditionalInfo/CemeteryAdditionalInfo';
import { CemeteryAudioBox } from './cemeteryMainInfo/CemeteryAudioBox';
import CemeteryMainInfo from './cemeteryMainInfo/CemeteryMainInfo';
import { CemeteryOut } from '@/openapi';
import { redirect } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import { isIOS } from '../utils/isIphone';

interface ICemeteryInfoProps {
  cemetery: CemeteryOut;
}

export const CemeteryInfo = ({ cemetery }: ICemeteryInfoProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isInfoBoxFullScreen, setInfoBoxFullScreen] = useState<boolean>(false);
  const [isScrolableArea, setScrollableArea] = useState<boolean>(false);

  if (!cemetery) {
    redirect(PATH.location);
  }

  useEffect(() => {
    if (scrollRef.current) {
      document
        .getElementById('cemetery-main-info')
        ?.addEventListener('touchstart', (e) => {
          setScrollableArea(true);
        });
    }
  }, [scrollRef]);

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
        setTouchEnd(currentYPos);
      });
    }
  }, [scrollRef]);

  useEffect(() => {
    const scrollToTopValue = isIOS() ? 290 : 182;
    if (scrollRef.current) {
      if (touchEnd > touchStart && isScrolableArea) {
        document.getElementById('page')?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setInfoBoxFullScreen(false);
        return;
      } else if (touchEnd > touchStart && !isScrolableArea) {
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = document
          .getElementById('cemetery-scrollable')
          ?.getBoundingClientRect();
        const offset = (elemRect?.top ?? 0) - bodyRect.top;
        if (offset > 0) {
          document.getElementById('page')?.scrollTo({
            top: window.screen.height - scrollToTopValue,
            left: 0,
            behavior: 'smooth',
          });
          setInfoBoxFullScreen(true);
        }
      } else if (touchEnd < touchStart && !isInfoBoxFullScreen) {
        document.getElementById('page')?.scrollTo({
          top: window.screen.height - scrollToTopValue,
          left: 0,
          behavior: 'smooth',
        });
        setInfoBoxFullScreen(true);
      }
    }

    onwheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        document.getElementById('page')?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setInfoBoxFullScreen(false);
      }
      if (event.deltaY > 0) {
        document.getElementById('cemetery-scrollable')?.scrollIntoView({
          behavior: 'smooth',
        });
        setInfoBoxFullScreen(true);
      }
    };
    setScrollableArea(false);
  }, [touchEnd, isInfoBoxFullScreen]);

  return (
    <div
      className="absolute w-full z-10 bg-white rounded-t-xl mt-[calc(100vh-182px)]"
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

      <div className="flex flex-col gap-6 items-center w-full px-6 z-10 bg-white pt-5 relative">
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
          <>
            <HorizontalPhotoGallery
              text={'Soldiers with Headstone Changes'}
              solders={cemetery.soldies_headstones_changed}
              className="z-10"
              dash={true}
            />
            <HorizontalPhotoGallery
              text={cemetery.filtered_soldiers.title}
              solders={cemetery.filtered_soldiers.soldiers}
              className="z-10"
              dash={true}
            />
          </>
        )}
      </div>
    </div>
  );
};
