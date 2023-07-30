import React, { useEffect, useState } from 'react';
import { SECOND } from '../../constants/constants';

type ITipWindowProps = {
  tipText: string;
  handleNextTip: () => void;
  isLastTip: boolean;
  className: string;
  locateDown: boolean;
};

export const TipWindow = ({
  tipText,
  handleNextTip,
  isLastTip,
  className,
  locateDown,
}: ITipWindowProps) => {
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
    const timerId = setTimeout(() => {
      if (isLastTip) {
        setOpened(false);
      } else {
        handleNextTip();
      }
    }, SECOND * 30);

    return () => clearTimeout(timerId);
  }, [tipText]);

  const handleClick = () => {
    if (isLastTip) {
      setOpened(false);
    } else {
      handleNextTip();
    }
  };

  return (
    <>
      {isOpened && (
        <>
          {!locateDown && <div className={`z-[11] ${className}`}></div>}

          <div
            className={`w-[350px] flex flex-col px-5 py-3 bg-white rounded-lg gap-0.5 toolkid-shadow `}
          >
            <p className="leading-6">{tipText}</p>
            <p
              className="leading-6 font-semibold text-blue"
              onClick={handleClick}
            >
              Got it
            </p>
          </div>
          {locateDown && <div className={`z-[11] ${className}`}></div>}
        </>
      )}
    </>
  );
};
