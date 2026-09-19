import { APIResponse } from "@playwright/test";


/**
 * Represents a typed API response.
 *
 * Keeps the transport-level HTTP response together with the
 * deserialized business response, allowing tests to validate
 * both protocol behavior and response data.
 */
export interface ApiResponse<T> {

    response: APIResponse;

    body: T;
}