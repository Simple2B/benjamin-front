import React, { useEffect, useRef } from 'react';

type IVideoPlayerProps = {
  srcVideo: string | null;
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
      videoRef.current.addEventListener('loadeddata', () => {
        console.log('video loaded');
        videoRef.current?.play();
      });
    }
  }, [srcVideo]);

  const videoStyle = {
    height: window.screen.width,
  };

  return (
    <>
      <div
        className="w-full bg-gradient-to-r from-indigo-20 to-indigo-30"
        style={videoStyle}
      >
        <video muted ref={videoRef} playsInline src={srcVideo ?? ''}></video>
      </div>
    </>
  );
};

export default VideoPlayer;
