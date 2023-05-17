import React from 'react';
import AudioPlayer from './audioPlayer/AudioPlayer';

type ICemeteryMainInfoProps = {
    name: string,
    location: string,
    contactInfo: string,
    audioSrc: string,

}

const CemeteryMainInfo = ({name, location, contactInfo, audioSrc}: ICemeteryMainInfoProps) => {
  return (
    <div className='mt-52 flex flex-col gap-2'>
      <h1 className='text-xl font-semibold'>{name}</h1>
      <p className='text-sm'>{location}</p>
      <p className='text-sm text-grey-20'>Audio Tour</p>
      <AudioPlayer audioSourse={audioSrc} />
    </div>
  );
};

export default CemeteryMainInfo;