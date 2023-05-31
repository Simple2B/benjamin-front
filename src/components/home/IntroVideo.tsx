import React, { useEffect, useRef } from 'react';

type IIntroVideoProps = {
  onVideoEnd?: () => void;
};

const IntroVideo = ({ onVideoEnd }: IIntroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!onVideoEnd) {
      return;
    }
    const timerId = setInterval(() => {
      if (videoRef.current?.ended) {
        onVideoEnd();
        clearInterval(timerId);
      }
    }, 100);
    return () => clearInterval(timerId);
  }, [onVideoEnd]);

  return (
    <div className="h-full">
      <video
        autoPlay
        playsInline
        muted
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/greetingVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default IntroVideo;
