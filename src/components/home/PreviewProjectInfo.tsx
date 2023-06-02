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
      return;
    }
    onNextButtonClick();
  };

  return (
    <div className="h-[calc(100dvh)] flex flex-col items-center all-height">
      <VideoPlayer
        srcVideo={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].vireoUrl}
        onVideoEnd={handleVideoEnd}
      />
      <div className="h-full flex flex-col">
        <ProjectInfo
          text={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].text}
          heading={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].heading}
        />
        <div className="h-full flex flex-col items-end justify-end px-6 mb-12">
          <Link href={isLastPage ? PATH.location : PATH.home}>
            <NavigationButton
              icon={ICONS_NAME.arrowRigth}
              action={isLastPage ? 'Done' : 'Next'}
              className={`w-28 text-white ${
                isButtonEnabled ? 'bg-turquoise-100' : 'bg-grey-30'
              }`}
              isButtonEnabled={isButtonEnabled}
              onClick={handleClick}
            />
          </Link>
        </div>
      </div>
      <CurrentPointer currentInfoIndex={currentInfoIndex} />
    </div>
  );
};

export default PreviewProjectInfo;
