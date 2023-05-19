import React from 'react';

type ISoldierAdditionalVideoProps = {
  videoUrl: string;
  videoDescription: string;
};

const SoldierAdditionalVideo = ({
  videoUrl,
  videoDescription,
}: ISoldierAdditionalVideoProps) => {
  return (
    <div className="mt-3">
      <p className="text-sm text-grey-20">{videoDescription}</p>
      <iframe
        className="w-full h-56 rounded-lg bg-grey-30 mt-2"
        src={videoUrl}
      ></iframe>
    </div>
  );
};

export default SoldierAdditionalVideo;
