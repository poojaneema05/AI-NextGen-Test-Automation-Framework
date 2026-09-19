import { APIResponse } from "@playwright/test";

import { FrameworkError } from "@common/errors/FrameworkError";
import { Logger } from "@logger/Logger";


/**
 * Centralizes common API response validations used across the framework.
 *
 * Keeps HTTP-level assertions out of individual tests and provides
 * consistent logging and failure handling.
 *
 * Business-specific assertions should remain with the corresponding
 * service or test.
 */
export class ApiAssertions {


    /**
     * Validates the HTTP status returned by an API operation.
     *
     * Throws FrameworkError instead of exposing raw assertion failures,
     * keeping framework-level validation consistent across API tests.
     */
    static async expectStatus(
        response: APIResponse,
        expectedStatus: number
    ): Promise<void> {

        const actualStatus =
            response.status();


        Logger.info(
            `Validating API status: expected ${expectedStatus}, actual ${actualStatus}`
        );


        if (actualStatus !== expectedStatus) {

            throw new FrameworkError(
                `API status validation failed. Expected ${expectedStatus}, but received ${actualStatus}.`
            );
        }
    }


    /**
     * Validates that the API operation completed successfully.
     *
     * Uses Playwright's response.ok() semantics, which treats
     * HTTP 2xx responses as successful.
     */
    static async expectSuccess(
        response: APIResponse
    ): Promise<void> {

        const status =
            response.status();


        Logger.info(
            `Validating successful API response: ${status}`
        );


        if (!response.ok()) {

            throw new FrameworkError(
                `API response was not successful. Received status ${status}.`
            );
        }
    }
}