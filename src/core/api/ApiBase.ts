import { ApiClient } from "@core/api/ApiClient";


/**
 * Base class for API service classes.
 *
 * Provides common access to the ApiClient.
 *
 * Business-specific API operations should remain
 * inside individual service classes.
 */
export abstract class ApiBase {

    protected readonly apiClient: ApiClient;


    constructor(apiClient: ApiClient) {

        this.apiClient = apiClient;
    }
}