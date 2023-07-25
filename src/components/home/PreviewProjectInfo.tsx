import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavigationButton from '../NavigationButton';
import VideoPlayer from './VideoPlayer';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';
import ProjectInfo from './projectInfo/ProjectInfo';
import { PROJECT_INFO_TO_DISPLAY } from './projectInfo/projectInfo.constants';
import { CurrentPointer } from './CurrentPointer';
import VideoSpinner from './VideoSpinner';

interface IPreviewProjectInfoProps {
  currentInfoIndex: number;
  onNextButtonClick: () => void;
  setCurrentInfoIndex: (index: number) => void;
}

const loadSrcVideo = (
  videoSrc: string,
  onBlobLoaded: (blobURL: string) => void
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
      }
    }
  });

  xhr.send();
};

const PreviewProjectInfo = ({
  currentInfoIndex,
  onNextButtonClick,
  setCurrentInfoIndex,
}: IPreviewProjectInfoProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const [projectInfoHeigth, setProjectInfoHeigth] = useState<number>(0);
  const [videoHeigth, setVideoHeight] = useState<number>(0);

  const [firstVideoSrc, setFirstVideoSrc] = useState<string | null>(null);
  const [secondVideoSrc, setSecondVideoSrc] = useState<string | null>(null);
  const [thirdVideoSrc, setThirdVideoSrc] = useState<string | null>(null);

  const isLastPage = currentInfoIndex == PROJECT_INFO_TO_DISPLAY.length - 1;

  useEffect(() => {
    setProjectInfoHeigth(window.screen.height - window.screen.width - 100);
    setVideoHeight(window.screen.width);

    loadSrcVideo(PROJECT_INFO_TO_DISPLAY[0].videoUrl, setFirstVideoSrc);
    loadSrcVideo(PROJECT_INFO_TO_DISPLAY[1].videoUrl, setSecondVideoSrc);
    loadSrcVideo(PROJECT_INFO_TO_DISPLAY[2].videoUrl, setThirdVideoSrc);
  }, []);

  useEffect(() => {
    setIsButtonEnabled(false);
    if (currentInfoIndex == 0 && firstVideoSrc) {
      setIsButtonEnabled(true);
    }
    if (currentInfoIndex == 1 && secondVideoSrc) {
      setIsButtonEnabled(true);
    }
    if (currentInfoIndex == 2 && thirdVideoSrc) {
      setIsButtonEnabled(true);
    }
  }, [currentInfoIndex, firstVideoSrc, secondVideoSrc, thirdVideoSrc]);

  const handleClick = () => {
    if (isLastPage) {
      if (!window.localStorage.getItem('isAnimationEnabled')) {
        localStorage.setItem('isAnimationEnabled', 'false');
      }
      return;
    }
    onNextButtonClick();
  };

  const projectInfoStyle = {
    height: projectInfoHeigth,
  };

  const videoStyle = {
    height: videoHeigth,
    width: '100%',
  };

  //all-height

  return (
    <>
      <div className="flex flex-col items-center bg-white mb-2">
        {currentInfoIndex == 0 && (
          <div
            style={videoStyle}
            className="w-full bg-gradient-to-r from-indigo-20 to-indigo-30 flex justify-center items-center"
          >
            {firstVideoSrc ? (
              <VideoPlayer srcVideo={firstVideoSrc} />
            ) : (
              <VideoSpinner />
            )}
          </div>
        )}
        {currentInfoIndex == 1 && (
          <div
            style={videoStyle}
            className="w-full bg-gradient-to-r from-indigo-20 to-indigo-30 flex justify-center items-center"
          >
            {secondVideoSrc ? (
              <VideoPlayer srcVideo={secondVideoSrc} />
            ) : (
              <VideoSpinner />
            )}
          </div>
        )}
        {currentInfoIndex == 2 && (
          <div
            style={videoStyle}
            className="w-full bg-gradient-to-r from-indigo-20 to-indigo-30 flex justify-center items-center"
          >
            {thirdVideoSrc ? (
              <VideoPlayer srcVideo={thirdVideoSrc} />
            ) : (
              <VideoSpinner />
            )}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-between gap-4 h-full"
          style={projectInfoStyle}
        >
          <ProjectInfo
            text={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].text}
            heading={PROJECT_INFO_TO_DISPLAY[currentInfoIndex].heading}
          />
          <div className="flex flex-col w-full justify-evenly h-full">
            <div className={`flex flex-col items-end justify-end px-6 w-full`}>
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
            <CurrentPointer
              currentInfoIndex={currentInfoIndex}
              setCurrentInfoIndex={setCurrentInfoIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewProjectInfo;
