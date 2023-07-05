import { useRef, useState, useEffect, use } from 'react';
import { redirect } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';

export const FilteredSoldiers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isInfoBoxFullScreen, setInfoBoxFullScreen] = useState<boolean>(false);
  const [isScrolableArea, setScrollableArea] = useState<boolean>(false);

  const {
    currentCemetery,
    currentFilteredSoldiers,
    currentFilterTitle,
    setCurrentFilterTitle,
    setCurrentFilteredSoldiers,
  } = useAppStore();

  if (!currentCemetery) {
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
            top: window.screen.height - 182,
            left: 0,
            behavior: 'smooth',
          });
          setInfoBoxFullScreen(true);
        }
      } else if (touchEnd < touchStart && !isInfoBoxFullScreen) {
        document.getElementById('page')?.scrollTo({
          top: window.screen.height - 182,
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
      <div
        className={`w-full flex flex-col gap-[21px] bg-white rounded-t-xl px-6  z-[9]`}
        id={'cemetery-main-info'}
      >
        <p className="text-2xl leading-7 py-5">
          {currentFilterTitle} in ({currentFilteredSoldiers?.length})
        </p>
      </div>
      <div className="flex flex-wrap px-6 gap-3">
        {currentFilteredSoldiers?.map((soldier, index) => (
          <div key={index} className="w-[140px]">
            <img
              src={'soldier?.photo'}
              alt="soldier"
              className="w-[140px] h-[132px] rounded-lg bg-slate-400"
            />
            <p className="leading-5 text-center">{soldier.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
