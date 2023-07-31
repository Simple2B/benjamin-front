/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Rank } from './Rank';

export type Grave = {
    uuid: string;
    suffix?: string;
    ranks: Array<Rank>;
    firstName: string;
    lastName: string;
    burialLocationLatitude?: number;
    burialLocationLongitude?: number;
    isHeadstoneChanged: boolean;
    deathDate?: string;
};

