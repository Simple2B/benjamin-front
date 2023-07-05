/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MessagesService {

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

}
