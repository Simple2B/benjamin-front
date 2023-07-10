/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Grave } from './Grave';
import type { SoldierCard } from './SoldierCard';
import type { SoldiersFiltered } from './SoldiersFiltered';

export type CemeteryOut = {
    name: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    webUrl?: string;
    superintendent?: string;
    amountBuriedSoldiersCommon?: number;
    amountBuriedSoldiersJewish?: number;
    amountBuriedSoldiersMissing?: number;
    uuid: string;
    war?: string;
    audio_tours: Array<string>;
    filtered_soldiers?: SoldiersFiltered;
    graves_coordinates: Array<Grave>;
    soldies_headstones_changed: Array<SoldierCard>;
};

