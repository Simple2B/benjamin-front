import NavigationButton from '@/components/NavigationButton';
import VideoPlayer from '@/components/VideoPlayer';
import { ICONS_NAME } from '@/components/constants/iconName';
import ProjectInfo from '@/components/projectInfo/ProjectInfo';
import React from 'react';

export default function page() {
  return (
    <div className='flex flex-col items-end'>
      <VideoPlayer srcVideo='/video/greetingVideo.mp4' />    
      <ProjectInfo />
      <NavigationButton icon={ICONS_NAME.arrowRigth} action='Done' />
    </div>
  );
}

