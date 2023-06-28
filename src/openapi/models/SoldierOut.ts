/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
    verified_stones: Array<SoldierStoneOut>;
    soldier_awards: Array<string>;
    jewishServicemansCard?: string;
    kiaTelegram?: string;
    replacementCeremonyVideo?: string;
    photoPaths: Array<string>;
    soldierAudioTour?: string;
};

