/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cemeteries } from '../models/Cemeteries';
import type { CemeteryOut } from '../models/CemeteryOut';
import type { Metadata } from '../models/Metadata';
import type { SoldierMessageCreate } from '../models/SoldierMessageCreate';
import type { SoldierOut } from '../models/SoldierOut';
import type { Soldiers } from '../models/Soldiers';
import type { SoldierStoneCreate } from '../models/SoldierStoneCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ApiService {

    /**
     * Get Cemeteries
     * Get all cemeteries with pagination
     * @returns Cemeteries Successful Response
     * @throws ApiError
     */
    public static getCemeteries(): CancelablePromise<Cemeteries> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cemetery',
        });
    }

    /**
     * Get Cemetery
     * @param cemeteryUuid
     * @returns CemeteryOut Successful Response
     * @throws ApiError
     */
    public static getCemetery(
        cemeteryUuid: string,
    ): CancelablePromise<CemeteryOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cemetery/{cemetery_uuid}',
            path: {
                'cemetery_uuid': cemeteryUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Soldiers
     * @param cemeteryUuid
     * @param q
     * @param birthYear
     * @param birthMonth
     * @param birthDay
     * @param deathYear
     * @param deathMonth
     * @param deathDay
     * @param birthLocation
     * @param page
     * @param perPage
     * @returns Soldiers Successful Response
     * @throws ApiError
     */
    public static getCemeterySoldiers(
        cemeteryUuid: string,
        q?: string,
        birthYear?: number,
        birthMonth?: number,
        birthDay?: number,
        deathYear?: number,
        deathMonth?: number,
        deathDay?: number,
        birthLocation?: string,
        page: number = 1,
        perPage: number = 10,
    ): CancelablePromise<Soldiers> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cemetery/{cemetery_uuid}/soldier',
            path: {
                'cemetery_uuid': cemeteryUuid,
            },
            query: {
                'q': q,
                'birth_year': birthYear,
                'birth_month': birthMonth,
                'birth_day': birthDay,
                'death_year': deathYear,
                'death_month': deathMonth,
                'death_day': deathDay,
                'birth_location': birthLocation,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

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
     * Delete Stone
     * @param stoneUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteStone(
        stoneUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/stone/{stone_uuid}',
            path: {
                'stone_uuid': stoneUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Message
     * @param messageUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteMessage(
        messageUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/message/{message_uuid}',
            path: {
                'message_uuid': messageUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Root
     * @returns Metadata Successful Response
     * @throws ApiError
     */
    public static rootApiGet(): CancelablePromise<Metadata> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/',
        });
    }

}
