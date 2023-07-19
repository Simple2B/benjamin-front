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
} from '../soldier/PreviewerSoldier/PreviewerSoldier.constants';
import { formatDate } from '../soldier/PreviewerSoldier/PreviewerSoldier.utils';
import RememberSoldier from '../soldier/RememberSoldier';
import SoldierAdditionalVideo from '../soldier/SoldierAdditionaVideo';
import SoldierAdditionalImage from '../soldier/SoldierAdditionalImage';
import SoldierCardBlockInfo from '../soldier/SoldierCardBlockInfo';
import { SoldierCoordinates } from '../soldier/SoldierCoordinates';
import { SoldierHeadstonePhoto } from '../soldier/SoldierHeadstonePhoto';
import SoldierMainInfoCard from '../soldier/SoldierMainInfoCard';
import { SoldierMessages } from '../soldier/SoldierMessages';
import { Ilife, IService, IDeath } from '../soldier/soldier.types';
import { isIOS } from '../utils/isIphone';

interface IPreviewerSoldierProps {
  soldier: SoldierOut;
}

export default function SoldierInfo({ soldier }: IPreviewerSoldierProps) {
  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement>(null);
  const cemeteryMainInfoRef = useRef<HTMLDivElement>(null);
  const additionalInfoRef = useRef<HTMLDivElement>(null);

  const [isUp, setIsUp] = useState<boolean>(false);
  const [isScrolableArea, setScrollableArea] = useState<boolean>(false);
  const [previousMainInfoPosition, setPreviousMainInfoPosition] =
    useState<number>(0);

  useEffect(() => {
    if (!soldier) {
      router.push(PATH.search);
    }
  }, [soldier, router]);

  useEffect(() => {
    if (additionalInfoRef && cemeteryMainInfoRef) {
      const mainInfoContainer = cemeteryMainInfoRef.current as HTMLDivElement;

      const mainPage = document.getElementById('page') as HTMLElement;
      const intervalId = setInterval(() => {
        const posY = mainInfoContainer.getBoundingClientRect().top;
        if (!isScrolableArea) {
          return;
        }
        if (isUp) {
          const scrollToTopValue = isIOS() ? 325 : 230;
          if (posY < 0) {
            return;
          }
          mainPage.scrollTo({
            top: screen.height - scrollToTopValue,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          mainPage.scrollTo({
            top: 5,
            left: 0,
            behavior: 'smooth',
          });
        }
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isUp, isScrolableArea, cemeteryMainInfoRef]);

  useEffect(() => {
    if (additionalInfoRef && cemeteryMainInfoRef) {
      const mainInfoContainer = cemeteryMainInfoRef.current as HTMLDivElement;
      const additionalInfoConteiner =
        additionalInfoRef.current as HTMLDivElement;

      // Main container events
      mainInfoContainer.addEventListener('touchstart', (e: TouchEvent) => {
        setScrollableArea(false);
        if (e.touches.length) {
          setPreviousMainInfoPosition(e.touches[0].clientY);
        }
      });

      mainInfoContainer.addEventListener('touchmove', () => {});
      mainInfoContainer.addEventListener('touchend', (e) => {
        const posY = e.changedTouches[0].clientY;
        if (previousMainInfoPosition < posY) {
          setIsUp(false);
        } else {
          setIsUp(true);
        }
        setPreviousMainInfoPosition(posY);
        setScrollableArea(true);
      });

      // // Additional container events
      additionalInfoConteiner.addEventListener('touchstart', () => {
        setScrollableArea(false);
      });

      additionalInfoConteiner.addEventListener('click', () => {
        setScrollableArea(false);
      });

      additionalInfoConteiner.addEventListener('touchend', () => {
        const posY = mainInfoContainer.getBoundingClientRect().top;
        if (posY < 0) {
          setIsUp(true);
        } else {
          setIsUp(false);
        }
        setScrollableArea(true);
      });
    }
  }, [previousMainInfoPosition]);

  let awardsInPreview = '';

  if (soldier?.soldierAwards.length) {
    awardsInPreview =
      soldier?.soldierAwards.length >= 1
        ? `${soldier?.soldierAwards[0]}, other awards`
        : soldier?.soldierAwards[0];
  }

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
      ref={scrollRef}
      className="absolute w-full z-10 bg-white rounded-t-xl mt-[calc(100vh-230px)]"
    >
      <div
        className="flex flex-col justify-center items-center mx-7 gap-4 text-indigo-100 leading-7 mb-8"
        ref={cemeteryMainInfoRef}
      >
        <div className="flex w-full justify-center mb-4">
          <div className="h-[3px] w-16 bg-grey-50 mt-2 rounded-3xl"></div>
        </div>
        <SoldierMainInfoCard
          photoUrl={
            soldier.mainPhoto
              ? urlJoin(AWS_BASE_URL || '', soldier.mainPhoto)
              : ''
          }
          sufix={soldier?.suffix}
          firstName={soldier?.firstName}
          lastName={soldier?.lastName}
          serviceNumber={soldier?.serviceNumber}
          branchOfService={soldier?.serviceBranch}
          awards={awardsInPreview}
        />
        <div ref={additionalInfoRef} className="flex flex-col gap-4">
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
        />
      </div>
    </div>
  );
}