import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavigationButton from '../NavigationButton';
import VideoPlayer from './VideoPlayer';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';
import ProjectInfo from './projectInfo/ProjectInfo';
import { PROJECT_INFO_TO_DISPLAY } from './projectInfo/projectInfo.constants';
import { CurrentPointer } from './CurrentPointer';

interface IPreviewProjectInfoProps {
  currentInfoIndex: number;
  onNextButtonClick: () => void;
}

const PreviewProjectInfo = ({
  currentInfoIndex,
  onNextButtonClick,
}: IPreviewProjectInfoProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const isLastPage = currentInfoIndex == PROJECT_INFO_TO_DISPLAY.length - 1;

  const handleVideoEnd = () => {
    setIsButtonEnabled(true);
  };

  useEffect(() => {
    setIsButtonEnabled(false);
  }, [currentInfoIndex]);

  const handleClick = () => {
    if (isLastPage) {
      localStorage.setItem('isVideoWatched', 'true');
      return;
    }
    onNextButtonClick();
  };

  const projectInfoStyle = {
    height: window.screen.height - window.screen.width,
  };

  return (
    <div className="flex flex-col items-center all-height bg-white">
      <VideoPlayer
        srcVideo={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].vireoUrl}
        onVideoEnd={handleVideoEnd}
      />
      <div
        className="flex flex-col items-center justify-between"
        style={projectInfoStyle}
      >
        <ProjectInfo
          text={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].text}
          heading={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].heading}
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-end justify-end px-6 mb-12 w-full">
            <Link href={isLastPage ? PATH.location : PATH.home}>
              <NavigationButton
                icon={ICONS_NAME.arrowRigth}
                action="Next"
                className={`w-28 text-white ${
                  isButtonEnabled ? 'bg-turquoise-100' : 'bg-grey-30'
                }`}
                isButtonEnabled={isButtonEnabled}
                onClick={handleClick}
                iconClassName={''}
              />
            </Link>
          </div>
          <CurrentPointer currentInfoIndex={currentInfoIndex} />
        </div>
      </div>
    </div>
  );
};

export default PreviewProjectInfo;
