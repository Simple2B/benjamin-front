import React from 'react';

type ISoldierAdditionalVideoProps = {
  videoUrl: string;
  videoDescription: string;
};

function getId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export const SoldierAdditionalVideo = ({
  videoUrl,
  videoDescription,
}: ISoldierAdditionalVideoProps) => {
  //const videoId = videoUrl.split('youtu.be/')[1];
  const videoId = getId(videoUrl);
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

  ('https://youtu.be/0-7IHOXkiV8?list=RDoHRNrgDIJfo');
  return (
    <div className="mt-3">
      <p className="text-sm text-grey-20">{videoDescription}</p>
      <iframe
        width="100%"
        height="224"
        className="rounded-lg bg-grey-30 mt-2 photo-shadow"
        src={youtubeUrl}
      ></iframe>
    </div>
  );
};
