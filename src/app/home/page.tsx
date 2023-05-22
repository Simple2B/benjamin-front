'use client';
import NavigationButton from '@/components/NavigationButton';
import { ICONS_NAME } from '@/components/constants/iconName';
import { PATH } from '@/components/constants/path.constants';
import ProjectInfo from '@/components/projectInfo/ProjectInfo';
import { PROJECT_INFO_TO_DISPLAY } from '@/components/projectInfo/projectInfo.constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [currentInfoIndex, setCurrentInfoIndex] = useState<number>(0);
  const [isButtonEnabled, setButtonButtonEnabled] = useState<boolean>(false);
  const [isLastPage, setLastPage] = useState<boolean>(false);

  const setButtonButtonEnable = () => {
    setButtonButtonEnabled(true);
  };

  useEffect(() => {
    if (currentInfoIndex == PROJECT_INFO_TO_DISPLAY.length - 1) {
      setLastPage(true);
    }

    setButtonButtonEnabled(false);
    const timeout = setTimeout(() => {
      setButtonButtonEnabled(true);
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentInfoIndex]);

  const handleClick = () => {
    if (isLastPage) {
      return;
    }
    setCurrentInfoIndex(currentInfoIndex + 1);
  };

  return (
    <>
      {isLastPage && <Link href={PATH.location} />}
      <ProjectInfo
        onVideoEnd={setButtonButtonEnable}
        text={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].text}
        heading={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].heading}
        vireoUrl={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].vireoUrl}
      />

      <div className="flex flex-col items-end justify-evenly">
        <div>
          <Link href={isLastPage ? PATH.location : PATH.home}>
            <NavigationButton
              icon={ICONS_NAME.arrowRigth}
              action={isLastPage ? 'Done' : 'Next'}
              className="w-28"
              isButtonEnabled={isButtonEnabled}
              onClick={handleClick}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
