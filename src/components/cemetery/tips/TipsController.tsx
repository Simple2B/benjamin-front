import React, { useEffect, useState } from 'react';
import { TipWindow } from './TipsWindow';

const TIPS = [
  {
    tipText:
      'Search for a specific Jewish soldier to learn more about his life and service.',
    className: 'arrow-top',
    locateDown: false,
  },
  {
    tipText:
      'Point your phone’s camera at any Star of David headstone to learn more about the soldier buried there. ',
    className: 'arrow-top ml-56',
    locateDown: false,
  },
  {
    tipText:
      'Zoom in and tap on one of the points on the map to learn where in the cemetery a specific notable soldier is located. ',
    className: 'arrow-bottom',
    locateDown: true,
  },
];

export const TipsController = () => {
  const [isSeen, setIsSeen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTipText, setCurrentTipText] = useState<string>(
    TIPS[currentIndex].tipText
  );
  const [isLastTip, setIsLastTip] = useState<boolean>(false);

  useEffect(() => {
    const isWatched = localStorage.getItem('isSeen');
    if (isWatched !== 'true') {
      setIsSeen(true);
      localStorage.setItem('isSeen', 'true');
    } else {
      setIsSeen(false);
    }
  }, []);

  const handleNextTip = () => {
    const nextIndex = currentIndex + 1;

    console.log(currentIndex);
    if (nextIndex === TIPS.length - 1) {
      setIsLastTip(true);
    }

    setCurrentIndex(nextIndex);
    setCurrentTipText(TIPS[nextIndex].tipText);
  };

  return (
    <div className="relative w-full flex flex-col justify-center mt-2 items-center z-10">
      {isSeen && (
        <TipWindow
          tipText={currentTipText}
          handleNextTip={handleNextTip}
          isLastTip={isLastTip}
          className={TIPS[currentIndex].className}
          locateDown={TIPS[currentIndex].locateDown}
        />
      )}
    </div>
  );
};
