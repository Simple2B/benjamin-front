/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cemeteries } from '../models/Cemeteries';
import type { CemeteryOut } from '../models/CemeteryOut';
import type { Metadata } from '../models/Metadata';
import type { SoldierOut } from '../models/SoldierOut';
import type { Soldiers } from '../models/Soldiers';

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
     * Get all cemeteries with pagination
     * @param cemeteryUuid
     * @param q
     * @param page
     * @param perPage
     * @returns Soldiers Successful Response
     * @throws ApiError
     */
    public static getCemeterySoldiers(
        cemeteryUuid: string,
        q?: string,
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
