/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cemeteries } from '../models/Cemeteries';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CemeteriesService {

    /**
     * Get Cemeteries
     * Get all cemeteries with pagination
     * @param page
     * @param perPage
     * @returns Cemeteries Successful Response
     * @throws ApiError
     */
    public static getCemeteriesApiCemeteryGet(
        page: number = 1,
        perPage: number = 10,
    ): CancelablePromise<Cemeteries> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cemetery',
            query: {
                'page': page,
                'per_page': perPage,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}