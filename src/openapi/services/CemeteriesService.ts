/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cemeteries } from '../models/Cemeteries';
import type { CemeteryOut } from '../models/CemeteryOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CemeteriesService {

    /**
     * Get Cemeteries
     * Get all cemeteries with pagination
     * @returns Cemeteries Successful Response
     * @throws ApiError
     */
    public static getCemeteriesApiCemeteryGet(): CancelablePromise<Cemeteries> {
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
    public static getCemeteryApiCemeteryCemeteryUuidGet(
        cemeteryUuid: string,
    ): CancelablePromise<CemeteryOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cemetery{cemetery_uuid}',
            path: {
                'cemetery_uuid': cemeteryUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
