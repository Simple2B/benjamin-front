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
    <div className="w-full flex flex-col gap-6 bg-white rounded-t-xl px-6 mt-[12.5rem] z-10 pt-8">
      <div className="flex flex-col gap-1">
        <h1
          className={`font-rajdhani text-2xl font-semibold  text-indigo-100 leading-7`}
        >
          {name}
        </h1>
        <p className="text-sm leading-5">{location}</p>
        <div className="flex gap-3 mt-2">
          {contactInfo.map(({ icon, description, link }) => (
            <div key={description}>
              {link && (
                <a href={linkAction[description] + link}>
                  <ButtonContactCemetery
                    icon={icon}
                    description={description}
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-indigo-100">Audio Tour</p>
        <AudioPlayer audioSourse={audioSrc} />
      </div>
      <hr />
    </div>
  );
};

export default CemeteryMainInfo;
