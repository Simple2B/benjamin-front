'use client';
import React from 'react';
import VideoPlayer from '../VideoPlayer';

type IProjectInfoProps = {
  heading: string;
  text: string;
  vireoUrl: string;
  onVideoEnd: () => void;
};

const ProjectInfo = ({
  heading,
  text,
  vireoUrl,
  onVideoEnd,
}: IProjectInfoProps) => {
  return (
    <>
      <VideoPlayer srcVideo={vireoUrl} onVideoEnd={onVideoEnd} />
      <div className="h-72">
        <div className="flex flex-col p-6 gap-2 text-indigo-100">
          <h1 className="text-2xl font-extrabold leading-none tracking-tight">
            {heading}
          </h1>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
