'use client';
import IntroVideo from '@/components/IntroVideo';
import PreviewProjectInfo from '@/components/PreviewProjectInfo';
import React, { useEffect, useRef, useState } from 'react';

export default function Page() {
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
}
