/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SoldierMessageType } from './SoldierMessageType';

export type SoldierMessageCreate = {
    senderEmail: string;
    messageText: string;
    messageType: SoldierMessageType;
};

