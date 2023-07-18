import React, { useEffect } from 'react';

type IProgressBarProps = { presentLoaded: number };

export const ProgressBar = ({ presentLoaded }: IProgressBarProps) => {
  const [videoHeight, setVideoHeight] = React.useState<number>(0);

  useEffect(() => {
    setVideoHeight(window.screen.width);
  }, []);

  const videoStyle = {
    height: videoHeight,
  };

  const progressStyle = {
    width: `${presentLoaded}%`,
  };

  return (
    <div
      className="w-full bg-gradient-to-r from-indigo-20 to-indigo-30 flex flex-col justify-center items-center "
      style={videoStyle}
    >
      <p className="text-white">Loading...</p>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 p-0.5">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={progressStyle}
        >
          {presentLoaded}%
        </div>
      </div>
    </div>
  );
};
