import ClosebleInfo from '@/components/ClosebleInfo';
import AudioPlayer from '@/components/audioPlayer/AudioPlayer';
import RememberSoldier from '@/components/soldier/RememberSoldier';
import SoldierAdditionalVideo from '@/components/soldier/SoldierAdditionaVideo';
import SoldierAdditionalImage from '@/components/soldier/SoldierAdditionalImage';
import SoldierCardBlockInfo from '@/components/soldier/SoldierCardBlockInfo';
import SoldierMainInfoCard from '@/components/soldier/SoldierMainInfoCard';
import React from 'react';
import { SoldierCoordinates } from './SoldierCoordinates';
import { SoldierMessages } from './SoldierMessages';

export interface ISoldierInfo {
  criteriaName: string;
  criteriaValue: string | string[];
}

const soldierInfo = {
  name: '1st Lt. Robert Fink',
  serviceNumber: 'O-430368',
  branchOfService: 'US Coast Guard',
  photoUrl:
    'https://i.pinimg.com/564x/93/71/ef/9371ef654aa84ecb36a098feeb3a080d.jpg',
  awards: ['Air Medal', 'Purple Heart'],
  audioSourse:
    'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
  finalBurialLocation: 'Plot D, Row 9, Grave 43',
  finalBurialCoordinates: [54, 89],
  birthDate: 'December 15th, 1927',
  birthLocation: 'Edminton, New Hampshire',
  stateEnteredServiceFrom: "Fort Jay (Governor's Island), New York",
  assignment: '583rd Signal Air Warning Battalion "C"',
  position: 'Gunner',
  jewishServicemanCard: '#',
  dateOfDeath: 'June 1, 1944',
  circumstancesOfDeath:
    'Succumbed to scrub typhus at the 2nd Station Hospital in Nadzab',
  initialBurial: 'Nadzab, Papua New Guinea',
  killedinActionTelegram: '#',
  ceremonyVideoUrl:
    'https://www.youtube.com/watch?v=bcNdYOsTcTg&list=RDbcNdYOsTcTg&start_radio=1',
  messages: [
    {
      sender: 'Message from Operation Benjamin ',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus libero elit, vel viverra est dignissim eu. Nam facilisis dapibus lorem vitae euismod. Donec congue velit a tellus cursus posuere. Donec pretium, ipsum ac tristique fringilla, nisl lectus auctor felis, sit amet accumsan nisi urna non nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris tincidunt imperdiet eros id porta. Phasellus semper, libero at commodo dignissim, mi massa rutrum nisi, nec luctus arcu risus sed sem. Praesent faucibus imperdiet nibh, et pellentesque ligula convallis in. Aliquam id pulvinar dolor, in volutpat est. Aenean finibus.',
    },
    {
      sender: 'Message from Robert Fink’s family',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus libero elit, vel viverra est dignissim eu. Nam facilisis dapibus lorem vitae euismod. Donec congue velit a tellus cursus posuere. Donec pretium, ipsum ac tristique fringilla, nisl lectus auctor felis, sit amet accumsan nisi urna non nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris tincidunt imperdiet eros id porta. Phasellus semper, libero at commodo dignissim, mi massa rutrum nisi, nec luctus arcu risus sed sem. Praesent faucibus imperdiet nibh, et pellentesque ligula convallis in. Aliquam id pulvinar dolor, in volutpat est. Aenean finibus.',
    },
  ],
};

export default function PreviewerSoldier() {
  const lifeInfo: ISoldierInfo[] = [
    {
      criteriaName: 'Birth date',
      criteriaValue: soldierInfo.birthDate,
    },
    {
      criteriaName: 'Birth location',
      criteriaValue: soldierInfo.birthLocation,
    },
  ];

  const serviceInfo: ISoldierInfo[] = [
    {
      criteriaName: 'Service number',
      criteriaValue: soldierInfo.serviceNumber,
    },
    {
      criteriaName: 'State entered service from',
      criteriaValue: soldierInfo.stateEnteredServiceFrom,
    },
    {
      criteriaName: 'Branch of service',
      criteriaValue: soldierInfo.branchOfService,
    },
    {
      criteriaName: 'Assignment',
      criteriaValue: soldierInfo.assignment,
    },
    {
      criteriaName: 'Position',
      criteriaValue: soldierInfo.position,
    },
    {
      criteriaName: 'Awards',
      criteriaValue: soldierInfo.awards,
    },
  ];

  const deathInfo: ISoldierInfo[] = [
    {
      criteriaName: 'Date of death',
      criteriaValue: soldierInfo.dateOfDeath,
    },
    {
      criteriaName: 'Circumstances of death',
      criteriaValue: soldierInfo.circumstancesOfDeath,
    },
    {
      criteriaName: 'Initial burial ',
      criteriaValue: soldierInfo.initialBurial,
    },
    {
      criteriaName: 'Final burial location',
      criteriaValue: soldierInfo.finalBurialLocation,
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center items-center mx-7 gap-4 my-4 text-indigo-100 leading-7 mb-32">
        <SoldierMainInfoCard
          photoUrl="/images/photos/soldier2.jpg"
          name={soldierInfo.name}
          serviceNumber={soldierInfo.serviceNumber}
          branchOfService={soldierInfo.branchOfService}
          awards={soldierInfo.awards}
        />
        {soldierInfo.audioSourse && (
          <div className="w-full bg-grey-10 rounded-lg p-4">
            <p className="text-sm text-grey-20">Audio Tour</p>
            <AudioPlayer audioSourse={soldierInfo.audioSourse} />
          </div>
        )}

        <SoldierCoordinates
          finalBurialCoordinates={soldierInfo.finalBurialCoordinates}
          finalBurialLocation={soldierInfo.finalBurialLocation}
        />

        <ClosebleInfo heading="LIFE">
          <SoldierCardBlockInfo solderInfo={lifeInfo} />
        </ClosebleInfo>
        <ClosebleInfo heading="SERVICE">
          <SoldierCardBlockInfo solderInfo={serviceInfo} />
          <SoldierAdditionalImage
            imageUrl={soldierInfo.jewishServicemanCard}
            imageDescription="Jewish Serviceman’s card"
          />
        </ClosebleInfo>

        <ClosebleInfo heading="DEATH">
          <SoldierCardBlockInfo solderInfo={deathInfo} />
          <SoldierAdditionalImage
            imageUrl={soldierInfo.killedinActionTelegram}
            imageDescription="Killed In Action (KIA) Telegram"
          />
        </ClosebleInfo>

        {soldierInfo.ceremonyVideoUrl && (
          <ClosebleInfo heading="CHANGE CEREMONY">
            <SoldierAdditionalVideo
              videoUrl={soldierInfo.ceremonyVideoUrl}
              videoDescription="Replacement ceremony video"
            />
          </ClosebleInfo>
        )}

        {soldierInfo.messages.length && (
          <ClosebleInfo heading="ADDITIONAL INFO">
            <SoldierMessages messages={soldierInfo.messages} />
          </ClosebleInfo>
        )}
      </div>
      <RememberSoldier name={soldierInfo.name} />
    </div>
  );
}
