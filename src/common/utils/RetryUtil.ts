import { FrameworkError } from "@common/errors/FrameworkError";
import { Logger } from "@logger/Logger";

export interface RetryOptions {
    maxRetries?: number;
    initialDelayMs?: number;
    backoffMultiplier?: number;
    retryableStatuses?: number[];
    operationName?: string;
}

/**
 * Provides reusable retry behavior for transient framework operations.
 *
 * Responsibilities:
 * - Retry operations that may temporarily fail
 * - Support configurable retry counts and delays
 * - Apply exponential backoff between attempts
 * - Optionally retry based on HTTP status codes
 * - Log retry activity without exposing sensitive data
 *
 * This utility is intentionally transport-agnostic so it can be reused
 * by API tests, event-driven workflows, asynchronous services, and
 * future AI-powered framework components.
 */
export class RetryUtil {

    static async execute<T>(
        operation: () => Promise<T>,
        options: RetryOptions = {}
    ): Promise<T> {

        const {
            maxRetries = 3,
            initialDelayMs = 500,
            backoffMultiplier = 2,
            operationName = "operation"
        } = options;

        let lastError: unknown;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {

            try {

                return await operation();

            } catch (error) {

                lastError = error;

                if (attempt === maxRetries) {

                    Logger.error(
                        `${operationName} failed after ${attempt + 1} attempts.`
                    );

                    throw new FrameworkError(
                        `${operationName} failed after ${attempt + 1} attempts.`,
                        { cause: error }
                    );
                }

                const delay =
                    initialDelayMs *
                    Math.pow(backoffMultiplier, attempt);

                Logger.warn(
                    `${operationName} failed. ` +
                    `Retrying attempt ${attempt + 1} of ${maxRetries} ` +
                    `after ${delay}ms.`
                );

                await this.sleep(delay);
            }
        }

        throw new FrameworkError(
            `${operationName} failed unexpectedly.`,
            { cause: lastError }
        );
    }

    /**
     * Pauses execution without blocking the Node.js event loop.
     */
    private static async sleep(delayMs: number): Promise<void> {

        await new Promise<void>((resolve) => {
            setTimeout(resolve, delayMs);
        });
    }
}