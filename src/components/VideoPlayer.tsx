import React, { useEffect, useRef } from 'react';

type IVideoPlayeProps = {
  srcVideo: string;
  onVideoEnd: () => void;
};

const VideoPlayer = ({ srcVideo, onVideoEnd }: IVideoPlayeProps) => {
  const videoRef: HTMLVideoElement = useRef();

  useEffect(() => {
    if (onVideoEnd) {
      const timerId = setInterval(() => {
        if (videoRef.current.ended) {
          onVideoEnd();
          clearInterval(timerId);
        }
      }, 100);
    }
  }, []);

  return (
    <div>
      <video autoPlay muted ref={videoRef}>
        <source src={srcVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
