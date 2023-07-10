'use client';
import ClosebleInfo from '@/components/ClosebleInfo';
import AudioPlayer from '@/components/audioPlayer/AudioPlayer';
import RememberSoldier from '@/components/soldier/RememberSoldier';
import SoldierAdditionalVideo from '@/components/soldier/SoldierAdditionaVideo';
import SoldierAdditionalImage from '@/components/soldier/SoldierAdditionalImage';
import SoldierCardBlockInfo from '@/components/soldier/SoldierCardBlockInfo';
import SoldierMainInfoCard from '@/components/soldier/SoldierMainInfoCard';
import React, { useEffect, useRef, useState } from 'react';
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
import { PATH } from '@/components/constants/path.constants';
import urlJoin from 'url-join';
import { AWS_BASE_URL } from '@/components/constants/constants';
import { formatDate } from './PreviewerSoldier.utils';
import { SoldierOut } from '@/openapi';
import { ProjectCreatorInfo } from '../ProjectCreatorInfo';
import { PhotoCarrousel } from '../PhotoCarrousel';

interface IPreviewerSoldierProps {
  soldier: SoldierOut;
}

export default function PreviewerSoldier({ soldier }: IPreviewerSoldierProps) {
  const [isScrolledDown, setScrolledDown] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!soldier) {
      router.push(PATH.search);
    }
  }, [soldier, router]);

  useEffect(() => {
    document
      .getElementById('soldier-page')
      ?.addEventListener('touchmove', (e) => {
        const { y, height } = (
          e.currentTarget as Element
        )?.getBoundingClientRect();
        if (height - Math.abs(y) <= 650) {
          setScrolledDown(true);
        } else {
          setScrolledDown(false);
        }
      });
  }, []);

  let awardsInPreview = '';

  if (soldier?.soldierAwards.length) {
    awardsInPreview =
      soldier?.soldierAwards.length >= 1
        ? `${soldier?.soldierAwards[0]}, other awards`
        : soldier?.soldierAwards[0];
  }

  const life: Ilife = {
    birthDate: {
      header: SOLDIER_LIFE_HEADERS.birthDate,
      value: formatDate(soldier?.birthDate),
    },
    birthLocation: {
      header: SOLDIER_LIFE_HEADERS.birthLocation,
      value: soldier?.birthLocation,
    },
    parentsNames: {
      header: SOLDIER_LIFE_HEADERS.parentsNames,
      value: soldier?.parents,
    },
  };

  const service: IService = {
    serviceNumber: {
      header: SOLDIER_SERVICE_HEADERS.serviceNumber,
      value: soldier?.serviceNumber,
    },
    stateEnteredServiceFrom: {
      header: SOLDIER_SERVICE_HEADERS.stateEnteredServiceFrom,
      value: soldier?.stateEnteredServiceFrom,
    },
    branchOfService: {
      header: SOLDIER_SERVICE_HEADERS.branchOfService,
      value: soldier?.serviceBranch,
    },
    assignment: {
      header: SOLDIER_SERVICE_HEADERS.assignment,
      value: soldier?.assignment,
    },
    position: {
      header: SOLDIER_SERVICE_HEADERS.position,
      value: soldier?.position,
    },
    awards: {
      header: SOLDIER_SERVICE_HEADERS.awards,
      value: soldier?.soldierAwards.join(', '),
    },
  };

  const death: IDeath = {
    dateOfDeath: {
      header: SOLDIER_DEATH_HEADERS.dateOfDeath,
      value: formatDate(soldier?.deathDate),
    },
    circumstancesOfDeath: {
      header: SOLDIER_DEATH_HEADERS.circumstancesOfDeath,
      value: soldier?.deathCircumstance,
    },
    initialBurial: {
      header: SOLDIER_DEATH_HEADERS.initialBurial,
      value: soldier?.initialBurialLocation,
    },
    finalBurialLocation: {
      header: SOLDIER_DEATH_HEADERS.finalBurialLocation,
      value: soldier?.finalBurialLocation,
    },
  };

  return (
    <div id="soldier-page">
      <div className="flex flex-col justify-center items-center mx-7 gap-4 my-4 text-indigo-100 leading-7 mb-56">
        <div
          className="w-full flex items-baseline justify-between mb-2"
          onClick={router.back}
        >
          <IconButton
            iconName={ICONS_NAME.selectingArrow}
            className="w-6 h-6 rotate-180"
          />
        </div>
        {soldier?.photoPaths && (
          <SoldierMainInfoCard
            photoUrl={
              soldier.photoPaths[0]
                ? urlJoin(AWS_BASE_URL || '', soldier.photoPaths[0])
                : ''
            }
            sufix={soldier?.suffix}
            firstName={soldier?.firstName}
            lastName={soldier?.lastName}
            serviceNumber={soldier?.serviceNumber}
            branchOfService={soldier?.serviceBranch}
            awards={awardsInPreview}
          />
        )}
        {soldier?.soldierAudioTour && (
          <div className=" bg-grey-10 rounded-lg p-4 w-[350px]">
            <p className="text-sm text-grey-20">Audio Tour</p>
            <AudioPlayer
              audioSourse={urlJoin(
                AWS_BASE_URL || '',
                soldier.soldierAudioTour
              )}
            />
          </div>
        )}

        <SoldierCoordinates
          finalBurialCoordinates={[
            soldier?.burialLocationLatitude,
            soldier?.burialLocationLongitude,
          ]}
          finalBurialLocation={soldier?.burialLocationName}
        />

        <ClosebleInfo
          heading="LIFE"
          isOpened={soldier?.replacementCeremonyVideo ? false : true}
        >
          <SoldierCardBlockInfo solderInfo={life} />
          <PhotoCarrousel photos={soldier.photoPaths} />
        </ClosebleInfo>

        <ClosebleInfo heading="SERVICE" isOpened={false}>
          <SoldierCardBlockInfo solderInfo={service} />
          {soldier?.jewishServicemansCard && (
            <SoldierAdditionalImage
              imageUrl={urlJoin(
                AWS_BASE_URL || '',
                soldier.jewishServicemansCard
              )}
              imageDescription={'Jewish Serviceman’s card'}
            />
          )}
        </ClosebleInfo>

        <ClosebleInfo heading="DEATH" isOpened={false}>
          <SoldierCardBlockInfo solderInfo={death} />
          {soldier?.kiaTelegram && (
            <SoldierAdditionalImage
              imageUrl={urlJoin(AWS_BASE_URL || '', soldier.kiaTelegram)}
              imageDescription={'Killed In Action (KIA) Telegram'}
            />
          )}
          {soldier?.verifiedStones.length ? (
            <SoldierAdditionalImage
              imageUrl={urlJoin(
                AWS_BASE_URL || '',
                soldier.verifiedStones[0].photoUrl
              )}
              imageDescription={'Headstone Photo'}
            />
          ) : null}
          <ProjectCreatorInfo />
        </ClosebleInfo>

        {soldier?.replacementCeremonyVideo && (
          <ClosebleInfo heading="CHANGE CEREMONY" isOpened={true}>
            <SoldierAdditionalVideo
              videoUrl={urlJoin(
                AWS_BASE_URL || '',
                soldier.replacementCeremonyVideo
              )}
              videoDescription="Replacement ceremony video"
            />
          </ClosebleInfo>
        )}

        {soldier.verifiedMessages.length ? (
          <ClosebleInfo heading="ADDITIONAL INFO" isOpened={false}>
            <SoldierMessages
              messages={soldier.verifiedMessages}
              soldierFirstName={soldier.firstName}
              soldierLastName={soldier.lastName}
              soldierSufix={soldier?.suffix}
            />
          </ClosebleInfo>
        ) : null}
      </div>
      <RememberSoldier
        soldierFirstName={soldier.firstName}
        soldierLastName={soldier.lastName}
        soldierSufix={soldier?.suffix}
        soldierUuid={soldier.uuid}
        isScrolledDown={isScrolledDown}
      />
    </div>
  );
}
