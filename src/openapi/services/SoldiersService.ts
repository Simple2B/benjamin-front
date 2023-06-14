/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SoldierOut } from '../models/SoldierOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SoldiersService {

    /**
     * Get Soldier
     * @param soldierUuid
     * @returns SoldierOut Successful Response
     * @throws ApiError
     */
    public static getSoldier(
        soldierUuid: string,
    ): CancelablePromise<SoldierOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/soldier/{soldier_uuid}',
            path: {
                'soldier_uuid': soldierUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
