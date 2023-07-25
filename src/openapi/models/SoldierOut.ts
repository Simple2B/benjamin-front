/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Rank } from './Rank';
import type { SoldierMessageOut } from './SoldierMessageOut';
import type { SoldierStoneOut } from './SoldierStoneOut';

export type SoldierOut = {
    serviceNumber: string;
    suffix?: string;
    firstName: string;
    lastName: string;
    serviceBranch: string;
    isStatusPow: boolean;
    birthDate: string;
    birthLocation?: string;
    deathDate?: string;
    deathCircumstance?: string;
    uuid: string;
    burialLocationName?: string;
    burialLocationLatitude?: number;
    burialLocationLongitude?: number;
    stateEnteredServiceFrom?: string;
    assignment?: string;
    position?: string;
    initialBurialLocation?: string;
    finalBurialLocation?: string;
    verifiedStones: Array<SoldierStoneOut>;
    verifiedMessages: Array<SoldierMessageOut>;
    parents?: string;
    elMaleh?: string;
    guardians: Array<string>;
    soldierAwards: Array<string>;
    soldierStatesEnteredFrom: Array<string>;
    soldierMilitaryUnits: Array<string>;
    ranks: Array<Rank>;
    mainPhoto?: string;
    jewishServicemansCard?: string;
    kiaTelegram?: string;
    headstonePhoto?: string;
    ceremonyVideoLink?: string;
    replacementCeremonyVideo?: string;
    photoPaths: Array<string>;
    soldierAudioTour?: string;
    wwDraftCard?: string;
    hirImage?: string;
};

