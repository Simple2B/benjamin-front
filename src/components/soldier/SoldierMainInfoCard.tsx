import React from 'react';
import Image from 'next/image';
import { ICONS_NAME } from '../constants/iconName';
import SoldierMainInfo from './SoldierMainInfo';

type ISoldierMainInfoProps = {
  photoUrl: string;
  name: string;
  serviceNumber: string;
  branchOfService: string;
  awards: string[];
};

interface IMilitaryInfo {
  heading: string;
  text: string | string[];
  icon: string;
}

const SoldierMainInfoCard = ({
  photoUrl,
  name,
  serviceNumber,
  branchOfService,
  awards,
}: ISoldierMainInfoProps) => {
  const militaryInfo: IMilitaryInfo[] = [
    {
      heading: 'Service number',
      text: serviceNumber,
      icon: ICONS_NAME.hastag,
    },
    {
      heading: 'Branch of service',
      text: branchOfService,
      icon: ICONS_NAME.chevron,
    },
    {
      heading: 'Awards',
      text: awards,
      icon: ICONS_NAME.medal,
    },
  ];

  return (
    <div className="flex justify-start gap-4 w-full">
      <Image
        src={photoUrl}
        width={140}
        height={132}
        alt="Soldier"
        className="w-[126px] h-[123px] rounded-lg bg-grey-30"
      />
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold font-rajdhaniSemiBold leading-7">
          {name}
        </p>
        {militaryInfo.map(({ heading, text, icon }) => {
          return (
            <SoldierMainInfo
              heading={heading}
              text={text}
              icon={icon}
              key={heading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SoldierMainInfoCard;
