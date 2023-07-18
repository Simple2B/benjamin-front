import React, { useEffect, useRef, useState } from 'react';

type IVideoPlayerProps = {
  srcVideo: string | null;
  onVideoEnd?: () => void;
};

const VideoPlayer = ({ srcVideo, onVideoEnd }: IVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoHeigth, setVideoHeight] = useState<number>(0);

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

  useEffect(() => {
    setVideoHeight(window.screen.width);
  }, []);

  const videoStyle = {
    height: videoHeigth,
  };

  return (
    <>
      <div
        className="w-full bg-gradient-to-r from-indigo-20 to-indigo-30"
        style={videoStyle}
      >
        <video
          autoPlay
          muted
          ref={videoRef}
          playsInline
          src={srcVideo ?? ''}
        ></video>
      </div>
    </>
  );
};

export default VideoPlayer;
