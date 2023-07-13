import { useRef, useState, useEffect, use } from 'react';
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
  const cemeteryMainInfoRef = useRef<HTMLDivElement>(null);
  const additionalInfoRef = useRef<HTMLDivElement>(null);

  const [touchStart, setTouchStart] = useState<number>(0);
  const [isUp, setIsUp] = useState<boolean>(false);

  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isInfoBoxFullScreen, setInfoBoxFullScreen] = useState<boolean>(false);
  const [isScrolableArea, setScrollableArea] = useState<boolean>(false);
  const [isUserTouchedAdditionalInfo, setUserTouchedAdditionalInfo] =
    useState<boolean>(false);

  if (!cemetery) {
    redirect(PATH.location);
  }

  useEffect(() => {
    const mainPage = document.getElementById('page') as HTMLElement;
    const intervalId = setInterval(() => {
      if (isScrolableArea) {
        console.log('no scroll');
        return;
      }

      if (isUp) {
        const scrollToTopValue = isIOS() ? 290 : 230;
        mainPage.scrollTo({
          top: screen.height - scrollToTopValue,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        console.log('Scroll to down');
        mainPage.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 10);
    console.log('interval', intervalId);
    return () => {
      console.log('clear interval');
      clearInterval(intervalId);
    };
  }, [isUp, isScrolableArea]);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     cemeteryMainInfoRef.current?.addEventListener('touchstart', (e) => {
  //       setScrollableArea(true);
  //     });
  //     cemeteryMainInfoRef.current?.addEventListener('touchend', (e) => {
  //       setScrollableArea(false);
  //     });
  //     additionalInfoRef.current?.addEventListener('touchstart', (e) => {
  //       setUserTouchedAdditionalInfo(true);
  //     });
  //     additionalInfoRef.current?.addEventListener('touchend', (e) => {
  //       setUserTouchedAdditionalInfo(false);
  //     });
  //   }
  // }, [scrollRef]);

  useEffect(() => {
    if (additionalInfoRef && cemeteryMainInfoRef) {
      const mainPage = document.getElementById('page') as HTMLElement;
      const mainInfoContainer = cemeteryMainInfoRef.current as HTMLDivElement;
      const additionalInfoConteiner =
        additionalInfoRef.current as HTMLDivElement;

      // Main container events
      mainInfoContainer.addEventListener('touchstart', () => {
        setScrollableArea(true);
        // mainInfoContainer.classList.add('touch-auto');
        // mainInfoContainer.classList.remove('touch-none');
      });
      mainInfoContainer.addEventListener('touchmove', () => {});
      mainInfoContainer.addEventListener('touchend', (e) => {
        // e.preventDefault();
        // mainInfoContainer.classList.remove('touch-auto');
        // mainInfoContainer.classList.add('touch-none');

        const posY = mainInfoContainer.getBoundingClientRect().top;
        if (posY <= screen.height / 2) {
          setIsUp(true);
        } else {
          setIsUp(false);
        }
        setScrollableArea(false);
        // setScrollableArea(true);
      });

      // additionalInfoConteiner.addEventListener('touchmove', () => {
      //   console.log('touched');
      // });

      // // Additional container events
      // additionalInfoConteiner.addEventListener('touchstart', () => {
      //   const posY = mainInfoContainer.getBoundingClientRect().top;
      //   console.log(mainInfoContainer.getBoundingClientRect());
      //   setTouchStart(posY);
      //   setScrollableArea(false);
      // });

      // additionalInfoConteiner.addEventListener('touchend', () => {
      //   const posY = mainInfoContainer.getBoundingClientRect().top;
      //   console.log(touchStart, posY);
      //   if (touchStart - posY < 0) {
      //     mainPage.scrollTo({
      //       top: screen.height - scrollToTopValue,
      //       left: 0,
      //       behavior: 'smooth',
      //     });
      //   } else {
      //     console.log('Down');
      //   }
      //   setScrollableArea(false);

      //   if (posY > 0) {
      //     mainPage.scrollTo({
      //       top: screen.height - scrollToTopValue,
      //       left: 0,
      //       behavior: 'smooth',
      //     });
      //   }
      // });
    }
  }, [touchStart]);

  useEffect(() => {}, [touchStart]);

  useEffect(() => {
    const scrollToTopValue = isIOS() ? 290 : 230;

    if (isScrolableArea && additionalInfoRef && cemeteryMainInfoRef) {
      const mainPage = document.getElementById('page') as HTMLElement;
      const mainInfoContainer = cemeteryMainInfoRef.current as HTMLDivElement;
      const additionalInfoConteiner =
        additionalInfoRef.current as HTMLDivElement;

      setScrollableArea(false);

      const posY = mainInfoContainer.getBoundingClientRect().top;
      const screenHalf = screen.height / 2;

      if (posY >= screenHalf) {
        mainPage.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        mainPage.scrollTo({
          top: screen.height - scrollToTopValue,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [isScrolableArea]);

  return (
    <div
      className="absolute w-full z-10 bg-white rounded-t-xl mt-[calc(100vh-230px)]"
      id="cemetery-scrollable"
      ref={scrollRef}
    >
      <div ref={cemeteryMainInfoRef}>
        <CemeteryMainInfo
          name={cemetery.name}
          location={cemetery.location ? cemetery.location : ''}
          phone={cemetery.phone}
          email={cemetery.email}
          webUrl={cemetery.webUrl}
        />
      </div>

      {cemetery.audio_tours.length ? (
        <CemeteryAudioBox audio_tours={cemetery.audio_tours} />
      ) : null}

      <div ref={additionalInfoRef}>
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
    </div>
  );
};
