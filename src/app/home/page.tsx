import NavigationButton from '@/components/NavigationButton';
import VideoPlayer from '@/components/VideoPlayer';
import { ICONS_NAME } from '@/components/constants/iconName';
import { PATH } from '@/components/constants/path.constants';
import ProjectInfo from '@/components/projectInfo/ProjectInfo';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className='flex flex-col items-end'>
      <VideoPlayer srcVideo='/video/greetingVideo.mp4' />    
      <ProjectInfo />
      <Link href={PATH.location}>
        <NavigationButton icon={ICONS_NAME.arrowRigth} action='Done'  className='w-28 bg-turquoise-100' />
      </Link>
    </div>
  );
}

