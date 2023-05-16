import React from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import SoldierMainInfo from './SoldierMainInfo';

type ISoldierMainInfoProps = {
  photoUrL:string, 
  name:string, 
  serviceNumber:string, 
  branchOfService:string, 
  awards: string
}

interface IMilitaryInfo {
  heading: string;
  text: string;
  icon: string;
}


const SoldierMainInfoCard = ({photoUrL, name, serviceNumber, branchOfService, awards}: ISoldierMainInfoProps) => {
  const militaryInfo :IMilitaryInfo[] = [
    { 
      heading: 'Service number',
      text: serviceNumber,
      icon: ICONS_NAME.hastag
    },
    { 
      heading: 'Branch of service',
      text: branchOfService,
      icon: ICONS_NAME.chevron
    },
    { 
      heading: 'Awards',
      text: awards,
      icon: ICONS_NAME.medal
    },
  ];

  return (
    <div className='flex justify-center gap-4'>
      <img src={photoUrL} className='w-36 h-32 rounded-lg bg-grey-30' alt="Soldier" />
      <div className='flex flex-col gap-2'>
        <p className='text-lg font-semibold'>{name}</p>
        {militaryInfo.map(({heading, text, icon})=>{
          return(
            <SoldierMainInfo heading={heading} text={text} icon={icon} key={heading}/>
          );
        })}     
               
      </div>
    </div>
  );
};

export default SoldierMainInfoCard;
