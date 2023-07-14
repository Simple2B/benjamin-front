import { useRef, useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { SoldierCard } from '@/openapi';
import Link from 'next/link';
import urlJoin from 'url-join';
import Spinner from '../Spinner';
import { AWS_BASE_URL } from '../constants/constants';
import { isIOS } from '../utils/isIphone';

type IFilteredSoldiersProps = {
  filterResult: SoldierCard[];
  isFetched: boolean;
  filterText: string;
};

export const FilteredSoldiers = ({
  filterResult,
  isFetched,
  filterText,
}: IFilteredSoldiersProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cemeteryMainInfoRef = useRef<HTMLDivElement>(null);
  const additionalInfoRef = useRef<HTMLDivElement>(null);

  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isInfoBoxFullScreen, setInfoBoxFullScreen] = useState<boolean>(false);
  const [isScrolableArea, setScrollableArea] = useState<boolean>(false);
  const [isUp, setIsUp] = useState<boolean>(false);

  const { currentCemetery } = useAppStore();

  if (!currentCemetery) {
    redirect(PATH.location);
  }

  useEffect(() => {
    if (additionalInfoRef && cemeteryMainInfoRef) {
      const mainInfoContainer = cemeteryMainInfoRef.current as HTMLDivElement;

      const mainPage = document.getElementById('page') as HTMLElement;
      const intervalId = setInterval(() => {
        const posY = mainInfoContainer.getBoundingClientRect().top;
        if (!isScrolableArea) {
          return;
        }
        if (isUp) {
          const scrollToTopValue = isIOS() ? 290 : 230;
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
            top: 0,
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
      mainInfoContainer.addEventListener('touchstart', () => {
        setScrollableArea(false);
      });

      mainInfoContainer.addEventListener('click', () => {
        setScrollableArea(false);
      });

      mainInfoContainer.addEventListener('touchmove', () => {});
      mainInfoContainer.addEventListener('touchend', (e) => {
        setScrollableArea(true);
        const posY = mainInfoContainer.getBoundingClientRect().top;
        if (posY <= screen.height / 2) {
          setIsUp(true);
        } else {
          setIsUp(false);
        }
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
        setIsUp(true);
        setScrollableArea(true);
      });
    }
  }, []);

  return (
    <div
      className="absolute w-full z-10 bg-white rounded-t-xl mt-[calc(100vh-230px)]"
      id="cemetery-scrollable"
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
          <p className="text-2xl leading-7 py-5">
            {filterText} ({filterResult?.length})
          </p>
        </div>
      </div>
      <div ref={additionalInfoRef}>
        {isFetched ? (
          <div className="flex flex-wrap px-6 gap-3">
            {filterResult?.map((soldier, index) => (
              <Link key={index} href={urlJoin(PATH.soldier, soldier.uuid)}>
                <div className="w-[140px]">
                  {soldier?.mainPhoto && AWS_BASE_URL ? (
                    <img
                      src={urlJoin(AWS_BASE_URL, soldier?.mainPhoto)}
                      alt="soldier"
                      className="w-[140px] h-[132px] rounded-lg bg-slate-400"
                    />
                  ) : (
                    <div className="w-[140px] h-[132px] rounded-lg bg-slate-400"></div>
                  )}
                  <p className="leading-5 text-center">
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
