import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavigationButton from '../NavigationButton';
import VideoPlayer from './VideoPlayer';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';
import ProjectInfo from './projectInfo/ProjectInfo';
import { PROJECT_INFO_TO_DISPLAY } from './projectInfo/projectInfo.constants';
import { CurrentPointer } from './CurrentPointer';
import Spinner from '../Spinner';
import { ProgressBar } from './ProgressBar';

interface IPreviewProjectInfoProps {
  currentInfoIndex: number;
  onNextButtonClick: () => void;
}

const loadSrcVideo = (
  videoSrc: string,
  onBlobLoaded: (blobURL: string) => void,
  onProgress: (progress: number) => void
) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', videoSrc, true);
  xhr.responseType = 'blob';

  xhr.addEventListener(
    'load',
    function () {
      if (xhr.status === 200) {
        console.log('xhr loaded');
        const URL = window.URL || window.webkitURL;
        const blobURL = URL.createObjectURL(xhr.response);
        onBlobLoaded(blobURL);
      }
    },
    false
  );

  var prev_pc = 0;
  xhr.addEventListener('progress', function (event) {
    if (event.lengthComputable) {
      const pc = Math.round((event.loaded / event.total) * 100);
      if (pc != prev_pc) {
        prev_pc = pc;
        onProgress(pc);
      }
    }
  });

  xhr.send();
};

const PreviewProjectInfo = ({
  currentInfoIndex,
  onNextButtonClick,
}: IPreviewProjectInfoProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [firstVideoSrc, setFirstVideoSrc] = useState<string | null>(null);
  const [secondVideoSrc, setSecondVideoSrc] = useState<string | null>(null);
  const [thirdVideoSrc, setThirdVideoSrc] = useState<string | null>(null);

  const [firstVideoProgress, setFirstVideoProgress] = useState<number>(0);
  const [secondVideoProgress, setSecondVideoProgress] = useState<number>(0);
  const [thirdVideoProgress, setThirdVideoProgress] = useState<number>(0);

  const isLastPage = currentInfoIndex == PROJECT_INFO_TO_DISPLAY.length - 1;

  const handleVideoEnd = () => {
    setIsButtonEnabled(true);
  };

  useEffect(() => {
    loadSrcVideo(
      PROJECT_INFO_TO_DISPLAY[0].videoUrl,
      setFirstVideoSrc,
      setFirstVideoProgress
    );
    loadSrcVideo(
      PROJECT_INFO_TO_DISPLAY[1].videoUrl,
      setSecondVideoSrc,
      setSecondVideoProgress
    );
    loadSrcVideo(
      PROJECT_INFO_TO_DISPLAY[2].videoUrl,
      setThirdVideoSrc,
      setThirdVideoProgress
    );
  }, []);

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
    <>
      <div className="flex flex-col items-center all-height bg-white">
        {currentInfoIndex == 0 && (
          <>
            {firstVideoSrc ? (
              <VideoPlayer
                srcVideo={firstVideoSrc}
                onVideoEnd={handleVideoEnd}
              />
            ) : (
              <ProgressBar presentLoaded={firstVideoProgress} />
            )}
          </>
        )}
        {currentInfoIndex == 1 && (
          <>
            {secondVideoSrc ? (
              <VideoPlayer
                srcVideo={secondVideoSrc}
                onVideoEnd={handleVideoEnd}
              />
            ) : (
              <ProgressBar presentLoaded={secondVideoProgress} />
            )}
          </>
        )}
        {currentInfoIndex == 2 && (
          <>
            {thirdVideoSrc ? (
              <VideoPlayer
                srcVideo={thirdVideoSrc}
                onVideoEnd={handleVideoEnd}
              />
            ) : (
              <ProgressBar presentLoaded={thirdVideoProgress} />
            )}
          </>
        )}

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
    </>
  );
};

export default PreviewProjectInfo;
