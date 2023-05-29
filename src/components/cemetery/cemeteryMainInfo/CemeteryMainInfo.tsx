import React from 'react';
import { linkAction } from './CemeteryMainInfo.constants';
import AudioPlayer from '@/components/audioPlayer/AudioPlayer';
import ButtonContactCemetery from '../ButtonContactCemetery';

type ICemeteryMainInfoProps = {
  name: string;
  location: string;
  contactInfo: IContactInfo[];
  audioSrc: string;
};

export interface IContactInfo {
  icon: string;
  description: string;
  link?: string;
}

const CemeteryMainInfo = ({
  name,
  location,
  contactInfo,
  audioSrc,
}: ICemeteryMainInfoProps) => {
  return (
    <div className="w-full mt-56 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-sm">{location}</p>
      </div>
      <div className="flex gap-3">
        {contactInfo.map(({ icon, description, link }) => (
          <>
            {link && (
              <a href={linkAction[description] + link} key={description}>
                <ButtonContactCemetery icon={icon} description={description} />
              </a>
            )}
          </>
        ))}
      </div>
      <div>
        <p className="text-sm text-grey-20">Audio Tour</p>
        <AudioPlayer audioSourse={audioSrc} />
      </div>
      <hr />
    </div>
  );
};

export default CemeteryMainInfo;
