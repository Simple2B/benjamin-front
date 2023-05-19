import React from 'react';

type IVideoPlayeProps = {
  srcVideo: string;
};

const VideoPlayer = ({ srcVideo }: IVideoPlayeProps) => {
  return (
    <div>
      <video autoPlay muted>
        <source src={srcVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
