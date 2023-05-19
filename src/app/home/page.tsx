'use client';
import NavigationButton from '@/components/NavigationButton';
import { ICONS_NAME } from '@/components/constants/iconName';
import { PATH } from '@/components/constants/path.constants';
import ProjectInfo from '@/components/projectInfo/ProjectInfo';
import {
  IProjectInfoToDisplay,
  PROJECT_INFO_TO_DISPLAY,
} from '@/components/projectInfo/projectInfo.constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [currentProjectInfo, setCurrentProjectInfo] =
    useState<IProjectInfoToDisplay>(PROJECT_INFO_TO_DISPLAY[0]);
  const [isButtonEnabled, setButtonButtonEnabled] = useState<boolean>(false);
  const [isLastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    setButtonButtonEnabled(false);
    const timeout = setTimeout(() => {
      setButtonButtonEnabled(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentProjectInfo]);

  const handleClick = () => {
    if (!isButtonEnabled) {
      return;
    }
    const indexOfCurrent: number =
      PROJECT_INFO_TO_DISPLAY.indexOf(currentProjectInfo);
    if (isLastPage) {
      return;
    }

    setCurrentProjectInfo(PROJECT_INFO_TO_DISPLAY[indexOfCurrent + 1]);
    if (indexOfCurrent == PROJECT_INFO_TO_DISPLAY.length - 2) {
      setLastPage(true);
      return;
    }
  };

  return (
    <>
      <ProjectInfo
        text={currentProjectInfo.text}
        heading={currentProjectInfo.heading}
        vireoUrl={currentProjectInfo.vireoUrl}
      />
      <div
        className="flex flex-col items-end justify-evenly"
        onClick={handleClick}
      >
        <div onClick={handleClick}>
          {isLastPage && isButtonEnabled ? (
            <Link href={PATH.location}>
              <NavigationButton
                icon={ICONS_NAME.arrowRigth}
                action={isLastPage ? 'Done' : 'Next'}
                className="w-28"
                isButtonEnabled={isButtonEnabled}
              />
            </Link>
          ) : (
            <NavigationButton
              icon={ICONS_NAME.arrowRigth}
              action={isLastPage ? 'Done' : 'Next'}
              className="w-28"
              isButtonEnabled={isButtonEnabled}
            />
          )}
        </div>
      </div>
    </>
  );
}
