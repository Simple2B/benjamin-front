/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SoldierCard } from './SoldierCard';

export type Soldiers = {
    page?: number;
    per_page?: number;
    items: Array<SoldierCard>;
    total: number;
};

