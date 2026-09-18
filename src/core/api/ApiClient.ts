import {
    APIRequestContext,
    APIResponse,
    request
} from "@playwright/test";

import { ConfigManager } from "@config/config.manager";
import { Logger } from "@logger/Logger";
import { FrameworkError } from "@common/errors/FrameworkError";
import { ApiAuth } from "@core/api/ApiAuth";
import { ApiAuthRequest } from "@core/api/models/ApiAuthRequest";

/**
 * Provides reusable HTTP operations for API automation.
 *
 * Responsibilities:
 * - Create and manage Playwright APIRequestContext
 * - Execute HTTP requests
 * - Provide environment-aware API configuration
 * - Centralize API error handling
 *
 * Business-specific API operations belong in Service classes,
 * not in this class.
 */
export class ApiClient {

    private readonly apiContext: APIRequestContext;

    private readonly baseUrl: string;

    private readonly authToken: string;

    private constructor(
        apiContext: APIRequestContext,
        baseUrl: string,
        authToken: string
    ) {

        this.apiContext = apiContext;
        this.baseUrl = baseUrl;
        this.authToken = authToken;
    }


    /**
     * Creates a new API client using the active environment.
     */
    static async create(): Promise<ApiClient> {

        try {

            const config =
                ConfigManager.getEnvironment();
            const credentials: ApiAuthRequest = {

            username: "admin",

            password: "password123"
            };


            const authToken =
            await ApiAuth.authenticate(
            credentials
    );

            Logger.info(
                `Creating API client for: ${config.apiUrl}`
            );

            const apiContext =
                await request.newContext({
                    baseURL: config.apiUrl
                });

            return new ApiClient(
                apiContext,
                config.apiUrl,
                authToken
            );

        } catch (error) {

            Logger.error(
                "Failed to create API client"
            );

            throw new FrameworkError(
                "Failed to create API client.",
                { cause: error }
            );
        }
    }


    /**
     * Performs a GET request.
     */
    async get(
        endpoint: string
    ): Promise<APIResponse> {

        return await this.execute(
            "GET",
            endpoint
        );
    }


    /**
     * Performs a POST request.
     */
    async post(
        endpoint: string,
        data?: unknown
    ): Promise<APIResponse> {

        return await this.execute(
            "POST",
            endpoint,
            data
        );
    }


    /**
     * Performs a PUT request.
     */
    async put(
        endpoint: string,
        data?: unknown
    ): Promise<APIResponse> {

        return await this.execute(
            "PUT",
            endpoint,
            data
        );
    }


    /**
     * Performs a PATCH request.
     */
    async patch(
        endpoint: string,
        data?: unknown
    ): Promise<APIResponse> {

        return await this.execute(
            "PATCH",
            endpoint,
            data
        );
    }


    /**
     * Performs a DELETE request.
     */
    async delete(
        endpoint: string
    ): Promise<APIResponse> {

        return await this.execute(
            "DELETE",
            endpoint
        );
    }


    /**
     * Closes the API request context.
     */
    async close(): Promise<void> {

        await this.apiContext.dispose();

        Logger.debug(
            `API client closed: ${this.baseUrl}`
        );
    }


    /**
     * Executes an HTTP request.
     */
    private async execute(
        method: string,
        endpoint: string,
        data?: unknown
    ): Promise<APIResponse> {

        Logger.info(
            `${method} ${endpoint}`
        );

        try {

            const response =
    await this.apiContext.fetch(
        endpoint,
        {
            method,
            data,
            headers: {
                Cookie: `token=${this.authToken}`
            }
        }
    );

            Logger.info(
                `${method} ${endpoint} → ${response.status()}`
            );

            return response;

        } catch (error) {

            Logger.error(
                `API request failed: ${method} ${endpoint}`
            );

            throw new FrameworkError(
                `API request failed: ${method} ${endpoint}`,
                { cause: error }
            );
        }
    }
}