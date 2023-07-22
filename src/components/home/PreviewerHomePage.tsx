'use client';
import React, { useEffect, useRef, useState } from 'react';
import IntroVideo from './IntroVideo';
import PreviewProjectInfo from './PreviewProjectInfo';
import { PATH } from '../constants/path.constants';
import { useRouter } from 'next/navigation';

const PreviewerHomePage = () => {
  const [displayVideoPreview, setDisplayVideoPreview] = useState<boolean>(true);
  const videoPreviewTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentInfoIndex, setCurrentInfoIndex] = useState<number>(0);
  const router = useRouter();

  const handleVideoEnd = () => {
    videoPreviewTimeoutRef.current = setTimeout(() => {
      const displayAnimation =
        window.localStorage.getItem('isAnimationEnabled') == 'true'
          ? true
          : false;

      if (!displayAnimation) {
        router.push(PATH.location);
        return;
      }
      setDisplayVideoPreview(false);
    }, 2000);
  };

  useEffect(() => {
    if (videoPreviewTimeoutRef.current) {
      clearTimeout(videoPreviewTimeoutRef.current);
    }
  }, []);

  const handleClick = () => {
    setCurrentInfoIndex((prev) => prev + 1);
  };

  return (
    <>
      {displayVideoPreview ? (
        <IntroVideo onVideoEnd={handleVideoEnd} />
      ) : (
        <PreviewProjectInfo
          currentInfoIndex={currentInfoIndex}
          onNextButtonClick={handleClick}
          setCurrentInfoIndex={setCurrentInfoIndex}
        />
      )}
    </>
  );
};

export default PreviewerHomePage;
