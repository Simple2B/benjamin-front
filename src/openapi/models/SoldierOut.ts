/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SoldierOut = {
    serviceNumber: string;
    firstName: string;
    lastName: string;
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
    soldier_awards: Array<string>;
    jewishServicemansCard?: string;
    kiaTelegram?: string;
    replacementCeremonyVideo?: string;
    photoPaths: Array<string>;
    soldierAudioTour?: string;
};

