import React from 'react';

type ISoldierAdditionalVideoProps = {
  videoUrl: string;
  videoDescription: string;
};

export const SoldierAdditionalVideo = ({
  videoUrl,
  videoDescription,
}: ISoldierAdditionalVideoProps) => {
  return (
    <div className="mt-3">
      <p className="text-sm text-grey-20">{videoDescription}</p>
      <video
        className="w-full h-56 rounded-lg bg-grey-30 mt-2 photo-shadow"
        controls
      >
        <source src={videoUrl} />
      </video>
    </div>
  );
};
