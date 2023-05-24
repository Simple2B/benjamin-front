/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CemeteryOut } from './CemeteryOut';

export type Cemeteries = {
    page?: number;
    per_page?: number;
    items: Array<CemeteryOut>;
    total: number;
};

