import { useRef, useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryOut, SoldierCard } from '@/openapi';
import Link from 'next/link';
import urlJoin from 'url-join';
import Spinner from '../Spinner';
import { AWS_BASE_URL } from '../constants/constants';
import { isIOS, isSafary } from '../utils/isIphone';

type IFilteredSoldiersProps = {
  filterResult: SoldierCard[];
  isFetched: boolean;
  filterText: string;
  cemetery: CemeteryOut;
};

export const FilteredSoldiers = ({
  filterResult,
  isFetched,
  filterText,
  cemetery,
}: IFilteredSoldiersProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cemeteryMainInfoRef = useRef<HTMLDivElement>(null);
  const additionalInfoRef = useRef<HTMLDivElement>(null);

  const [isScrolableArea, setScrollableArea] = useState<boolean>(false);
  const [isUp, setIsUp] = useState<boolean>(false);
  const [previousMainInfoPosition, setPreviousMainInfoPosition] =
    useState<number>(0);

  const { setCurrentCemetery } = useAppStore();

  useEffect(() => {
    setCurrentCemetery(cemetery);
  }, [cemetery]);

  useEffect(() => {
    if (additionalInfoRef && cemeteryMainInfoRef) {
      const mainInfoContainer = cemeteryMainInfoRef.current as HTMLDivElement;

      const mainPage = document.getElementById('page') as HTMLElement;
      const intervalId = setInterval(() => {
        const posY = mainInfoContainer.getBoundingClientRect().top;
        if (!isScrolableArea) {
          return;
        }

        let heigth = isIOS() ? 325 : 230;
        if (isIOS()) {
          heigth = isSafary() ? 325 : 295;
        }

        if (isUp) {
          const scrollToTopValue = heigth;
          if (posY < 0) {
            return;
          }
          mainPage.scrollTo({
            top: screen.height - scrollToTopValue,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          mainPage.scrollTo({
            top: 5,
            left: 0,
            behavior: 'smooth',
          });
        }
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isUp, isScrolableArea, cemeteryMainInfoRef]);

  useEffect(() => {
    if (additionalInfoRef && cemeteryMainInfoRef) {
      const mainInfoContainer = cemeteryMainInfoRef.current as HTMLDivElement;
      const additionalInfoConteiner =
        additionalInfoRef.current as HTMLDivElement;

      // Main container events
      mainInfoContainer.addEventListener('touchstart', (e: TouchEvent) => {
        setScrollableArea(false);
        if (e.touches.length) {
          setPreviousMainInfoPosition(e.touches[0].clientY);
        }
      });

      mainInfoContainer.addEventListener('touchmove', () => {});
      mainInfoContainer.addEventListener('touchend', (e) => {
        const posY = e.changedTouches[0].clientY;
        if (previousMainInfoPosition < posY) {
          setIsUp(false);
        } else {
          setIsUp(true);
        }
        setPreviousMainInfoPosition(posY);
        setScrollableArea(true);
      });

      // // Additional container events
      additionalInfoConteiner.addEventListener('touchstart', () => {
        setScrollableArea(false);
      });

      additionalInfoConteiner.addEventListener('click', () => {
        setScrollableArea(false);
      });

      additionalInfoConteiner.addEventListener('touchend', () => {
        const posY = mainInfoContainer.getBoundingClientRect().top;
        if (posY < 0) {
          setIsUp(true);
        } else {
          setIsUp(false);
        }
        setScrollableArea(true);
      });
    }
  }, [previousMainInfoPosition]);

  const filterResultText = filterResult?.length
    ? `${filterText} (${filterResult?.length})`
    : 'No soldiers found';

  return (
    <div
      className="absolute w-full z-10 bg-white rounded-t-xl mt-[calc(100vh-230px)]"
      id="scrollable-content"
      ref={scrollRef}
    >
      <div ref={cemeteryMainInfoRef}>
        <div
          className={`w-full flex flex-col gap-[21px] bg-white rounded-t-xl px-6  z-[9]`}
          id={'cemetery-main-info'}
        >
          <div className="flex w-full justify-center">
            <div className="h-[3px] w-16 bg-grey-50 mt-2 rounded-3xl"></div>
          </div>
          <p className="text-xl leading-7 py-5">{filterResultText}</p>
        </div>
      </div>
      <div ref={additionalInfoRef}>
        {isFetched ? (
          <div className="flex flex-wrap pb-6 gap-3 px-6">
            {filterResult?.map((soldier, index) => (
              <Link key={index} href={urlJoin(PATH.soldier, soldier.uuid)}>
                <div className="w-[140px] flex flex-col gap-2">
                  <img
                    src={
                      soldier?.mainPhoto && AWS_BASE_URL
                        ? urlJoin(AWS_BASE_URL, soldier?.mainPhoto)
                        : '/images/photos/soldeirProfilePhoto.jpg'
                    }
                    alt="soldier"
                    className="w-[140px] h-[132px] rounded-lg bg-slate-400 object-cover photo-shadow"
                  />

                  <p className="leading-5 text-center">
                    {soldier?.ranks.map((rank) => rank.abbreviation).join(' ')}
                    {soldier.suffix} {soldier.firstName} {soldier.lastName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
