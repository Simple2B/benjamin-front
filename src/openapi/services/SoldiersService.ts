/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SoldierFilters } from '../models/SoldierFilters';
import type { SoldierMessageCreate } from '../models/SoldierMessageCreate';
import type { SoldierOut } from '../models/SoldierOut';
import type { SoldierStoneCreate } from '../models/SoldierStoneCreate';

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

    /**
     * Create Soldier Stone
     * @param soldierUuid
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createSoldierStone(
        soldierUuid: string,
        requestBody: SoldierStoneCreate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/soldier/{soldier_uuid}/stone',
            path: {
                'soldier_uuid': soldierUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Soldier Message
     * @param soldierUuid
     * @param requestBody
     * @param statusCode
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createSoldierMessage(
        soldierUuid: string,
        requestBody: SoldierMessageCreate,
        statusCode?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/soldier/{soldier_uuid}/message',
            path: {
                'soldier_uuid': soldierUuid,
            },
            query: {
                'status_code': statusCode,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Cemetery Soldier Filters
     * @param cemeteryUuid
     * @returns SoldierFilters Successful Response
     * @throws ApiError
     */
    public static getCemeterySoldierFilters(
        cemeteryUuid: string,
    ): CancelablePromise<SoldierFilters> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/soldier/filters/{cemetery_uuid}',
            path: {
                'cemetery_uuid': cemeteryUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
