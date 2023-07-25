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
      <iframe
        width="100%"
        height="224"
        className="rounded-lg bg-grey-30 mt-2 photo-shadow"
        src={videoUrl}
      ></iframe>
    </div>
  );
};
