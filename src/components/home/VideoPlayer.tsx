import React, { useEffect, useRef } from 'react';

type IVideoPlayerProps = {
  srcVideo: string;
  onVideoEnd?: () => void;
};

const VideoPlayer = ({ srcVideo, onVideoEnd }: IVideoPlayerProps) => {
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
    if (videoRef && videoRef.current) {
      videoRef.current.setAttribute('src', srcVideo);
    }
  }, [srcVideo]);

  useEffect(() => {
    const setHeightToWidth = () => {
      if (videoRef && videoRef.current) {
        const { offsetWidth } = videoRef.current;
        videoRef.current.style.height = `${offsetWidth}px`;
      }
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
        playsInline
        className="w-screen bg-gradient-to-r from-indigo-20 to-indigo-30"
      ></video>
    </>
  );
};

export default VideoPlayer;
