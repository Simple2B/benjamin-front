'use client';

import { SoldierOut } from '@/openapi';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import urlJoin from 'url-join';
import ClosebleInfo from '../ClosebleInfo';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import { AWS_BASE_URL } from '../constants/constants';
import { PATH } from '../constants/path.constants';
import { GuardiansOfHeroes } from '../soldier/GuardiansOfHeroes';
import { PhotoCarrousel } from '../soldier/PhotoCarrousel';
import {
  SOLDIER_LIFE_HEADERS,
  SOLDIER_SERVICE_HEADERS,
  SOLDIER_DEATH_HEADERS,
  SOLDIER_MAIN_INFO_HEADERS,
} from '../soldier/PreviewerSoldier/PreviewerSoldier.constants';
import { formatDate } from '../soldier/PreviewerSoldier/PreviewerSoldier.utils';

import { SoldierMessages } from '../soldier/SoldierMessages';
import { Ilife, IService, IDeath, IMainInfo } from '../soldier/soldier.types';
import { isIOS, isSafary } from '../utils/isIphone';
import {
  RememberSoldier,
  SoldierAdditionalImage,
  SoldierAdditionalVideo,
  SoldierCardBlockInfo,
  SoldierCoordinates,
  SoldierHeadstonePhoto,
  SoldierMainInfoCard,
} from '../soldier';
import { useAppStore } from '@/lib/slices/store';

interface IPreviewerSoldierProps {
  soldier: SoldierOut;
}

export default function SoldierInfo({ soldier }: IPreviewerSoldierProps) {
  const router = useRouter();

  const { currentCemetery } = useAppStore();

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
    <div className={`absolute scroll-container inset-0 h-full `}>
      <div className="relative scroll-area h-[calc(100vh-230px)] w-screen bg-transparent pointer-events-none z-0"></div>
      <div
        className="relative w-screen z-50 bg-white rounded-t-xl scroll-area min-h-screen scrollable-content-cemetery"
        id="scrollable-content"
      >
        <div className="flex flex-col justify-center items-center mx-7 gap-4 text-indigo-100 leading-7 mb-8">
          <div className="flex w-full justify-center mb-4">
            <div className="h-[3px] w-16 bg-grey-50 mt-2 rounded-3xl"></div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-center">
              <SoldierMainInfoCard
                photoUrl={
                  soldier.mainPhoto
                    ? urlJoin(AWS_BASE_URL || '', soldier.mainPhoto)
                    : ''
                }
                fullName={soldierFullName}
                mainInfo={mainInfo}
              />
              <div className="flex flex-col gap-4">
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
                      imageUrl={urlJoin(
                        AWS_BASE_URL || '',
                        soldier.wwDraftCard
                      )}
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
                      imageUrl={urlJoin(
                        AWS_BASE_URL || '',
                        soldier.kiaTelegram
                      )}
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
                      imageUrl={urlJoin(
                        AWS_BASE_URL || '',
                        soldier.headstonePhoto
                      )}
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
            </div>
            <div className="mt-4">
              <RememberSoldier
                soldierFullName={soldierFullName}
                soldierUuid={soldier.uuid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
