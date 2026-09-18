import { ApiAuthRequest } from "@core/api/models/ApiAuthRequest";
import { ApiAuthResponse } from "@core/api/models/ApiAuthResponse";

import { ConfigManager } from "@config/config.manager";
import { Logger } from "@logger/Logger";
import { FrameworkError } from "@common/errors/FrameworkError";

import {
    APIRequestContext,
    request
} from "@playwright/test";


/**
 * Handles API authentication.
 *
 * Responsibilities:
 * - Create an API request context
 * - Authenticate with the API
 * - Retrieve the authentication token
 */
export class ApiAuth {


    /**
     * Authenticates with the API and returns
     * the authentication token.
     */
    static async authenticate(
        credentials: ApiAuthRequest
    ): Promise<string> {

        let apiContext: APIRequestContext | undefined;


        try {

            const config =
                ConfigManager.getEnvironment();


            Logger.info(
                `Authenticating with API: ${config.apiUrl}`
            );


            apiContext =
                await request.newContext({
                    baseURL: config.apiUrl
                });


            const response =
                await apiContext.post(
                    "/auth",
                    {
                        data: credentials
                    }
                );


            if (!response.ok()) {

                throw new FrameworkError(
                    `API authentication failed with status ${response.status()}`
                );
            }


            const body =
                await response.json() as ApiAuthResponse;


            if (!body.token) {

                throw new FrameworkError(
                    "API authentication succeeded but no token was returned."
                );
            }


            Logger.info(
                "API authentication successful"
            );


            return body.token;

        } catch (error) {

            Logger.error(
                "API authentication failed"
            );


            if (error instanceof FrameworkError) {

                throw error;
            }


            throw new FrameworkError(
                "API authentication failed.",
                { cause: error }
            );

        } finally {

            if (apiContext) {

                await apiContext.dispose();
            }
        }
    }
}