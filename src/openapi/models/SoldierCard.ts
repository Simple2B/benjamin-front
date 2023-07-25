/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Rank } from './Rank';

export type SoldierCard = {
    uuid: string;
    suffix?: string;
    ranks: Array<Rank>;
    serviceNumber: string;
    firstName: string;
    lastName: string;
    birthLocation?: string;
    burialLocationLatitude?: number;
    burialLocationLongitude?: number;
    mainPhoto?: string;
};

