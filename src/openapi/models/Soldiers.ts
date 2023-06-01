/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SoldierOut } from './SoldierOut';

export type Soldiers = {
    page?: number;
    per_page?: number;
    items: Array<SoldierOut>;
    total: number;
};

