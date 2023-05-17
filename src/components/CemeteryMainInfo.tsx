import React from 'react';
import AudioPlayer from './audioPlayer/AudioPlayer';
import ButtonContactCemetery from './ButtonContactCemetery';

type ICemeteryMainInfoProps = {
    name: string,
    location: string,
    contactInfo: IContactInfo[],
    audioSrc: string,
}

export interface IContactInfo {
	icon: string,
	description: string,
}

const CemeteryMainInfo = ({name, location, contactInfo, audioSrc}: ICemeteryMainInfoProps) => {
  return (
    <div className='mt-52 flex flex-col gap-4'>
      <div>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-sm'>{location}</p>
      </div>
      <div className='flex gap-3'>
        {contactInfo.map(({icon, description})=>
          <ButtonContactCemetery icon={icon} description={description} key={description}/>
        )}
      </div>
      <p className='text-sm text-grey-20'>Audio Tour</p>
      <AudioPlayer audioSourse={audioSrc} />
    </div>
  );
};

export default CemeteryMainInfo;