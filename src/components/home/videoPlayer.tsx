import React from 'react';

type Props = {}

const VideoPlayer = (props: Props) => {
  return (
    <div>
        <video autoPlay muted id="myVideo">
          <source
            src='/video/greetingVideo.mp4'
            type="video/mp4"
          />
      </video>

     </div>
  )
}

export default VideoPlayer