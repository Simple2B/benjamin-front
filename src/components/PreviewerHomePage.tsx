'use client';
import React, { useEffect, useRef, useState } from 'react';
import IntroVideo from './IntroVideo';
import PreviewProjectInfo from './PreviewProjectInfo';

const PreviewerHomePage = () => {
  const [displayVideoPreview, setDisplayVideoPreview] = useState<boolean>(true);
  const videoPreviewTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentInfoIndex, setCurrentInfoIndex] = useState<number>(0);

  const handleVideoEnd = () => {
    videoPreviewTimeoutRef.current = setTimeout(() => {
      setDisplayVideoPreview(false);
    }, 1500);
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
        />
      )}
    </>
  );
};

export default PreviewerHomePage;
