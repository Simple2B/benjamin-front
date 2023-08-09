'use client';

import ClosebleInfo from '@/components/ClosebleInfo';
import IconButton from '@/components/IconButton';
import AudioPlayer from '@/components/audioPlayer/AudioPlayer';
import { AWS_BASE_URL } from '@/components/constants/constants';
import { ICONS_NAME } from '@/components/constants/iconName';
import { PATH } from '@/components/constants/path.constants';
import { MessageSendPopUp } from '@/components/message/MessageSendPopUp';
import {
  SoldierMessages,
  SoldierCoordinates,
  SoldierHeadstonePhoto,
  GuardiansOfHeroes,
  IMainInfo,
  Ilife,
  IService,
  IDeath,
  SoldierCardBlockInfo,
  SoldierAdditionalImage,
  SoldierAdditionalVideo,
  RememberSoldier,
  SoldierMainInfoCard,
  SOLDIER_MAIN_INFO_HEADERS,
  SOLDIER_LIFE_HEADERS,
  SOLDIER_SERVICE_HEADERS,
  SOLDIER_DEATH_HEADERS,
  formatDate,
  PhotoCarrousel,
} from '.././index';
import { useAppStore } from '@/lib/slices/store';
import { SoldierOut } from '@/openapi';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import urlJoin from 'url-join';

interface IPreviewerSoldierProps {
  soldier: SoldierOut;
}

export default function PreviewerSoldier({ soldier }: IPreviewerSoldierProps) {
  const router = useRouter();
  const [isSent, setSent] = useState<boolean>(false);

  const {
    currentMessage,
    currenSoldierScroll,
    setCurrentSoldierScroll,
    currentCemetery,
  } = useAppStore();

  useEffect(() => {
    if (currenSoldierScroll) {
      const mainPage = document.getElementById('page') as HTMLElement;
      mainPage.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth',
      });
      setCurrentSoldierScroll(false);
    }
  }, []);

  useEffect(() => {
    if (currentMessage?.createdAt) {
      if (new Date().getTime() - currentMessage?.createdAt.getTime() < 10000) {
        setSent(true);
        const timer = setTimeout(() => {
          setSent(false);
        }, 10000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentMessage]);

  useEffect(() => {
    if (!soldier) {
      currentCemetery
        ? router.push(urlJoin(PATH.search, currentCemetery?.uuid))
        : router.push(PATH.location);
    }
  }, [soldier, router]);

  const soldierRanksNames = soldier?.ranks.map((rank) => rank.name).join(', ');
  const sodlierRanksAbbreviations = soldier?.ranks
    .map((rank) => rank.abbreviation)
    .join(' ');

  const soldierFullName = `${sodlierRanksAbbreviations} ${soldier.firstName} ${soldier.lastName} ${soldier?.suffix}`;

  const mainInfo: IMainInfo = {
    dateOfDeath: {
      header: SOLDIER_MAIN_INFO_HEADERS.dateOfDeath,
      value: formatDate(soldier?.deathDate),
    },

    status: {
      header: SOLDIER_MAIN_INFO_HEADERS.status,
      value: soldier.isStatusPow ? 'P.O.W.' : undefined,
    },
  };

  const life: Ilife = {
    birthDate: {
      header: SOLDIER_LIFE_HEADERS.birthDay,
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
      value: soldier?.soldierStatesEnteredFrom.join(', '),
    },
    branchOfService: {
      header: SOLDIER_SERVICE_HEADERS.branchOfService,
      value: soldier?.serviceBranch,
    },
    rank: {
      header: SOLDIER_SERVICE_HEADERS.rank,
      value: soldierRanksNames,
    },
    unit: {
      header: SOLDIER_SERVICE_HEADERS.unit,
      value: soldier?.soldierMilitaryUnits.join(', '),
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
    <div
      id="soldier-page"
      className="min-h-screen flex flex-col justify-between"
    >
      {isSent && <MessageSendPopUp />}
      <div className="flex flex-col justify-center items-center mx-7 gap-4 my-4 text-indigo-100 leading-7 mb-8">
        <div
          className="w-full flex items-baseline justify-between mb-2"
          onClick={router.back}
        >
          <IconButton
            iconName={ICONS_NAME.navigateBack}
            className="w-6 h-6 rotate-180"
          />
        </div>
        {soldier?.firstName && (
          <SoldierMainInfoCard
            photoUrl={
              soldier.mainPhoto
                ? urlJoin(AWS_BASE_URL || '', soldier.mainPhoto)
                : ''
            }
            fullName={soldierFullName}
            mainInfo={mainInfo}
          />
        )}
        {soldier?.soldierAudioTour && (
          <div className=" bg-grey-10 rounded-lg py-4 px-5 w-[350px]">
            <p className="text-sm text-grey-20 pb-1.5">Audio Tour</p>
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
          isOpened={soldier?.ceremonyVideoLink ? false : true}
        >
          <SoldierCardBlockInfo solderInfo={life} />
          <PhotoCarrousel photos={soldier.photoPaths} />
        </ClosebleInfo>

        <ClosebleInfo heading="SERVICE" isOpened={false}>
          <SoldierCardBlockInfo solderInfo={service} />
          {soldier?.wwDraftCard && (
            <SoldierAdditionalImage
              imageUrl={urlJoin(AWS_BASE_URL || '', soldier.wwDraftCard)}
              imageDescription={'WWII Draft Card'}
            />
          )}
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
          {soldier?.hirImage && (
            <SoldierAdditionalImage
              imageUrl={urlJoin(AWS_BASE_URL || '', soldier.hirImage)}
              imageDescription={
                'HIR (Headstone Interment Record) for Military Cemeteries on Foreign Soil '
              }
            />
          )}
          {soldier?.headstonePhoto ? (
            <SoldierHeadstonePhoto
              imageUrl={urlJoin(AWS_BASE_URL || '', soldier.headstonePhoto)}
            />
          ) : null}
          {soldier?.guardians.length ? (
            <GuardiansOfHeroes guardiansOfHeroes={soldier.guardians} />
          ) : null}
        </ClosebleInfo>

        {soldier?.ceremonyVideoLink && (
          <ClosebleInfo heading="CHANGE CEREMONY" isOpened={true}>
            <SoldierAdditionalVideo
              videoUrl={soldier.ceremonyVideoLink}
              videoDescription="Replacement ceremony video"
            />
          </ClosebleInfo>
        )}

        {soldier.verifiedMessages.length ? (
          <ClosebleInfo heading="ADDITIONAL INFO" isOpened={false}>
            <SoldierMessages
              messages={soldier.verifiedMessages}
              soldierFullName={soldierFullName}
            />
          </ClosebleInfo>
        ) : null}
      </div>
      <RememberSoldier
        soldierFullName={soldierFullName}
        soldierUuid={soldier.uuid}
      />
    </div>
  );
}
