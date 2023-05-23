import React, { useEffect, useRef } from 'react';

type IVideoPlayeProps = {
  srcVideo: string;
  onVideoEnd?: () => void;
};

const VideoPlayer = ({ srcVideo, onVideoEnd }: IVideoPlayeProps) => {
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

  useEffect(() => {
    videoRef.current.setAttribute('src', srcVideo);
  }, [srcVideo]);

  useEffect(() => {
    const setHeightToWidth = () => {
      const { offsetWidth } = videoRef.current;
      videoRef.current.style.height = `${offsetWidth}px`;
    };
    setHeightToWidth();
    window.onresize = setHeightToWidth;
    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <video
        autoPlay
        muted
        ref={videoRef}
        className="w-screen bg-grey-20"
      ></video>
    </>
  );
};

export default VideoPlayer;
