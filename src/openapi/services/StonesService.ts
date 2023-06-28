/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StonesService {

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

}
