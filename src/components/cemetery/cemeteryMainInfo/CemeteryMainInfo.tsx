import React from 'react';
import { linkAction } from './CemeteryMainInfo.constants';
import ButtonContactCemetery from '../ButtonContactCemetery';
import { ICONS_NAME } from '@/components/constants/iconName';

interface IContactInfo {
  icon: string;
  description: string;
  link?: string;
}

type ICemeteryMainInfoProps = {
  name: string;
  location: string;
  phone?: string;
  email?: string;
  webUrl?: string;
};

const CemeteryMainInfo = ({
  name,
  location,
  phone,
  email,
  webUrl,
}: ICemeteryMainInfoProps) => {
  const contactInfo: IContactInfo[] = [
    {
      icon: ICONS_NAME.telephone,
      description: 'Call',
      link: phone,
    },
    {
      icon: ICONS_NAME.envelope,
      description: 'Email',
      link: email,
    },
    {
      icon: ICONS_NAME.web,
      description: 'Website',
      link: webUrl,
    },
  ];

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
    </div>
  );
};

export default CemeteryMainInfo;
