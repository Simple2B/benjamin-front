import React from 'react';
import { ICONS_NAME } from '../constants/iconName';
import SoldierMainInfo from './SoldierMainInfo';

type ISoldierMainInfoProps = {
  photoUrl: string | undefined;
  sufix: string | undefined;
  serviceNumber: string | undefined;
  branchOfService: string | undefined;
  awards: string | undefined;
  firstName: string;
  lastName: string;
};

interface IMilitaryInfo {
  heading: string;
  text: string | undefined;
  icon: string;
}

const SoldierMainInfoCard = ({
  photoUrl,
  sufix,
  firstName,
  lastName,
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
    <div className="flex justify-start gap-4 w-[350px] mb-2 ">
      <img
        src={photoUrl ? photoUrl : '/images/photos/soldeirProfilePhoto.jpg'}
        alt="Soldier"
        className="w-[126px] h-[123px] rounded-lg bg-grey-30 object-cover"
      />

      <div className="flex flex-col gap-2.5">
        <p className="text-xl font-semibold leading-7">
          {sufix} {firstName} {lastName}
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
