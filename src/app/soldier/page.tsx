import ClosebleInfo from '@/components/ClosebleInfo';
import RememberSoldier from '@/components/RememberSoldier';
import SoldierAdditionalVideo from '@/components/SoldierAdditionaVideo';
import SoldierAdditionalImage from '@/components/SoldierAdditionalImage';
import SoldierCardBlockInfo from '@/components/SoldierCardBlockInfo';
import SoldierMainInfoCard from '@/components/SoldierMainInfoCard';
import AudioPlayer from '@/components/audioPlayer/AudioPlayer';
import React from 'react';

export interface IInfo {
  criteriaName: string;
  criteriaValue: string;
}

export default function Page() {
  const lifeInfo: IInfo[] = [
    {
      criteriaName: 'Birth date',
      criteriaValue: 'December 15th, 1927',
    },
    {
      criteriaName: 'Birth location',
      criteriaValue: 'Edminton, New Hampshire',
    },
  ];

  const serviceInfo: IInfo[] = [
    {
      criteriaName: 'Service number',
      criteriaValue: 'O-430368',
    },
    {
      criteriaName: 'State entered service from',
      criteriaValue: "Fort Jay (Governor's Island), New York",
    },
    {
      criteriaName: 'Branch of service',
      criteriaValue: 'US Airforce',
    },
    {
      criteriaName: 'Assignment',
      criteriaValue: '583rd Signal Air Warning Battalion "C"',
    },
    {
      criteriaName: 'Position',
      criteriaValue: 'Gunner',
    },
    {
      criteriaName: 'Awards',
      criteriaValue: 'Air Medal, Purple Heart',
    },
  ];

  const deathInfo: IInfo[] = [
    {
      criteriaName: 'Date of death',
      criteriaValue: 'June 1, 1944',
    },
    {
      criteriaName: 'Circumstances of death',
      criteriaValue:
        'Succumbed to scrub typhus at the 2nd Station Hospital in Nadzab',
    },
    {
      criteriaName: 'Initial burial ',
      criteriaValue: 'Initial burial ',
    },
    {
      criteriaName: 'Initial burial ',
      criteriaValue:
        'Manila American Cemetery (Plot A, Row 7, Grave 79), Taguig City, Philippines',
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center items-center mx-7 gap-4 my-4">
        <SoldierMainInfoCard
          photoUrL="#"
          name="1st Lt. Robert Fink"
          serviceNumber="O-430368"
          branchOfService="US Coast Guard"
          awards="Purple Heart"
        />
        <div className="w-full bg-grey-10 rounded-lg p-3">
          <p className="text-sm text-grey-20">Audio Tour</p>
          <AudioPlayer audioSourse="https://www.bensound.com/bensound-music/bensound-tenderness.mp3" />
        </div>
        <ClosebleInfo
          heading="LIFE"
          component={<SoldierCardBlockInfo solderInfo={lifeInfo} />}
        />
        <ClosebleInfo
          heading="SERVICE"
          component={
            <>
              <SoldierCardBlockInfo solderInfo={serviceInfo} />
              <SoldierAdditionalImage
                imageUrl="#"
                imageDescription="Jewish Serviceman’s card"
              />
            </>
          }
        />
        <ClosebleInfo
          heading="DEATH"
          component={
            <>
              <SoldierCardBlockInfo solderInfo={deathInfo} />
              <SoldierAdditionalImage
                imageUrl="#"
                imageDescription="Killed In Action (KIA) Telegram"
              />
            </>
          }
        />
        <ClosebleInfo
          heading="CHANGE CEREMONY"
          component={
            <SoldierAdditionalVideo
              videoUrl="-"
              videoDescription="Replacement ceremony video"
            />
          }
        />
      </div>
      <RememberSoldier name="1st Lt. Robert Fink" />
    </div>
  );
}
