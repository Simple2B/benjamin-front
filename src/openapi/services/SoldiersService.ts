/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Soldiers } from '../models/Soldiers';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SoldiersService {

    /**
     * Get Soldiers
     * Get all cemeteries with pagination
     * @param q
     * @param page
     * @param perPage
     * @returns Soldiers Successful Response
     * @throws ApiError
     */
    public static getSoldiersApiSoldierGet(
        q?: string,
        page: number = 1,
        perPage: number = 10,
    ): CancelablePromise<Soldiers> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/soldier',
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

}
