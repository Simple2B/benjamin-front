import VideoPlayer from '@/components/VideoPlayer';
import ProjectInfo from '@/components/projectInfo/ProjectInfo';
import React from 'react';

export default function page() {
  return (
    <div>
      <VideoPlayer srcVideo='/video/greetingVideo.mp4' />    
      <ProjectInfo />
    </div>
  );
}

