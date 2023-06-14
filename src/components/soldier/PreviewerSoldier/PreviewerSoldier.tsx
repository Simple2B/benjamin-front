'use client';
import ClosebleInfo from '@/components/ClosebleInfo';
import AudioPlayer from '@/components/audioPlayer/AudioPlayer';
import RememberSoldier from '@/components/soldier/RememberSoldier';
import SoldierAdditionalVideo from '@/components/soldier/SoldierAdditionaVideo';
import SoldierAdditionalImage from '@/components/soldier/SoldierAdditionalImage';
import SoldierCardBlockInfo from '@/components/soldier/SoldierCardBlockInfo';
import SoldierMainInfoCard from '@/components/soldier/SoldierMainInfoCard';
import React from 'react';
import { SoldierCoordinates } from '../SoldierCoordinates';
import { SoldierMessages } from '../SoldierMessages';
import { Ilife, IService, IDeath } from '../soldier.types';
import {
  SOLDIER_LIFE_HEADERS,
  SOLDIER_SERVICE_HEADERS,
  SOLDIER_DEATH_HEADERS,
} from './PreviewerSoldier.constants';
import IconButton from '@/components/IconButton';
import { ICONS_NAME } from '@/components/constants/iconName';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/slices/store';
import { PATH } from '@/components/constants/path.constants';
import urlJoin from 'url-join';
import { AWS_BASE_URL } from '@/components/constants/constants';

const soldierInfo = {
  name: '1st Lt. Robert Fink',
  serviceNumber: 'O-430368',
  branchOfService: 'US Coast Guard',
  photoUrl: '/images/photos/soldier2.jpg',
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
  jewishServicemanCardDescription: 'Jewish Serviceman’s card',
  jewishServicemanCardPhotoUrl: '/images/photos/document.jpg',
  dateOfDeath: 'June 1, 1944',
  circumstancesOfDeath:
    'Succumbed to scrub typhus at the 2nd Station Hospital in Nadzab',
  initialBurial: 'Nadzab, Papua New Guinea',
  killedinActionTelegramDescription: 'Killed In Action (KIA) Telegram',
  killedinActionTelegramPhotoUrl: '/images/photos/document.jpg',
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
  const router = useRouter();

  const { currentSoldier, currentCemetery } = useAppStore();

  if (!currentSoldier) {
    if (!currentCemetery) {
      router.push(PATH.location);
    } else {
      router.push(PATH.search);
    }
  }

  const soldierInfo = currentSoldier;

  let awardsInPreview = '';

  if (soldierInfo?.soldier_awards.length) {
    awardsInPreview =
      soldierInfo?.soldier_awards.length >= 1
        ? `${soldierInfo?.soldier_awards[0]}, other awards`
        : soldierInfo?.soldier_awards[0];
  }

  const life: Ilife = {
    birthDate: {
      header: SOLDIER_LIFE_HEADERS.birthDate,
      value: soldierInfo?.birthDate,
    },
    birthLocation: {
      header: SOLDIER_LIFE_HEADERS.birthLocation,
      value: soldierInfo?.birthDate,
    },
  };

  const service: IService = {
    serviceNumber: {
      header: SOLDIER_SERVICE_HEADERS.serviceNumber,
      value: soldierInfo?.serviceNumber,
    },
    stateEnteredServiceFrom: {
      header: SOLDIER_SERVICE_HEADERS.stateEnteredServiceFrom,
      value: soldierInfo?.stateEnteredServiceFrom,
    },
    branchOfService: {
      header: SOLDIER_SERVICE_HEADERS.branchOfService,
      value: soldierInfo?.serviceBranch,
    },
    assignment: {
      header: SOLDIER_SERVICE_HEADERS.assignment,
      value: soldierInfo?.assignment,
    },
    position: {
      header: SOLDIER_SERVICE_HEADERS.position,
      value: soldierInfo?.position,
    },
    awards: {
      header: SOLDIER_SERVICE_HEADERS.awards,
      value: soldierInfo?.soldier_awards.join(', '),
    },
  };

  const death: IDeath = {
    dateOfDeath: {
      header: SOLDIER_DEATH_HEADERS.dateOfDeath,
      value: soldierInfo?.deathDate,
    },
    circumstancesOfDeath: {
      header: SOLDIER_DEATH_HEADERS.circumstancesOfDeath,
      value: soldierInfo?.deathCircumstance,
    },
    initialBurial: {
      header: SOLDIER_DEATH_HEADERS.initialBurial,
      value: soldierInfo?.initialBurialLocation,
    },
    finalBurialLocation: {
      header: SOLDIER_DEATH_HEADERS.finalBurialLocation,
      value: soldierInfo?.finalBurialLocation,
    },
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mx-7 gap-4 my-4 text-indigo-100 leading-7 mb-32">
        <div
          className="w-full flex items-baseline justify-between mb-2"
          onClick={router.back}
        >
          <IconButton
            iconName={ICONS_NAME.selectingArrow}
            className="w-6 h-6 rotate-180"
          />
        </div>
        {soldierInfo?.photoPaths && (
          <SoldierMainInfoCard
            photoUrl={urlJoin(AWS_BASE_URL || '', soldierInfo.photoPaths[0])}
            name={soldierInfo?.firstName}
            serviceNumber={soldierInfo?.serviceNumber}
            branchOfService={soldierInfo?.serviceBranch}
            awards={awardsInPreview}
          />
        )}
        {soldierInfo?.soldierAudioTour && (
          <div className="w-full bg-grey-10 rounded-lg p-4">
            <p className="text-sm text-grey-20">Audio Tour</p>
            <AudioPlayer
              audioSourse={urlJoin(
                AWS_BASE_URL || '',
                soldierInfo.soldierAudioTour
              )}
            />
          </div>
        )}

        <SoldierCoordinates
          finalBurialCoordinates={soldierInfo?.finalBurialLocation}
          finalBurialLocation={soldierInfo?.finalBurialLocation}
        />

        <ClosebleInfo
          heading="LIFE"
          isOpened={soldierInfo?.replacementCeremonyVideo ? false : true}
        >
          <SoldierCardBlockInfo solderInfo={life} />
        </ClosebleInfo>

        <ClosebleInfo heading="SERVICE" isOpened={false}>
          <SoldierCardBlockInfo solderInfo={service} />
          {soldierInfo?.jewishServicemansCard && (
            <SoldierAdditionalImage
              imageUrl={urlJoin(
                AWS_BASE_URL || '',
                soldierInfo.jewishServicemansCard
              )}
              imageDescription={'Jewish Serviceman’s card'}
            />
          )}
        </ClosebleInfo>

        <ClosebleInfo heading="DEATH" isOpened={false}>
          <SoldierCardBlockInfo solderInfo={death} />
          {soldierInfo?.kiaTelegram && (
            <SoldierAdditionalImage
              imageUrl={urlJoin(AWS_BASE_URL || '', soldierInfo.kiaTelegram)}
              imageDescription={'Killed In Action (KIA) Telegram'}
            />
          )}
        </ClosebleInfo>

        {soldierInfo?.replacementCeremonyVideo && (
          <ClosebleInfo heading="CHANGE CEREMONY" isOpened={true}>
            <SoldierAdditionalVideo
              videoUrl={urlJoin(
                AWS_BASE_URL || '',
                soldierInfo.replacementCeremonyVideo
              )}
              videoDescription="Replacement ceremony video"
            />
          </ClosebleInfo>
        )}

        {/* {soldierInfo.messages.length && (
          <ClosebleInfo heading="ADDITIONAL INFO" isOpened={false}>
            <SoldierMessages messages={soldierInfo.messages} />
          </ClosebleInfo>
        )} */}
      </div>
      <RememberSoldier name={soldierInfo?.firstName} />
    </div>
  );
}
