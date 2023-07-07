/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SoldierMessageOut } from './SoldierMessageOut';
import type { SoldierStoneOut } from './SoldierStoneOut';

export type SoldierOut = {
    serviceNumber: string;
    name: string;
    serviceBranch: string;
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
    soldierAwards: Array<string>;
    jewishServicemansCard?: string;
    kiaTelegram?: string;
    replacementCeremonyVideo?: string;
    photoPaths: Array<string>;
    soldierAudioTour?: string;
};

