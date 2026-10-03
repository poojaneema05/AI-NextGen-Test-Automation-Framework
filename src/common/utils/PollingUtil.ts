import { FrameworkError } from "@common/errors/FrameworkError";
import { Logger } from "@logger/Logger";

/**
 * Configuration options for polling an asynchronous condition.
 *
 * Polling is useful when a system operation completes successfully but
 * the expected state is not immediately available. This is common in
 * distributed and eventually consistent systems where processing may
 * continue after the initial request has returned.
 */
export interface PollingOptions {
    /**
     * Maximum amount of time, in milliseconds, to wait for the
     * expected condition to become true.
     */
    timeoutMs?: number;

    /**
     * Time to wait between polling attempts.
     */
    intervalMs?: number;

    /**
     * Human-readable name used in framework logs and timeout errors.
     */
    operationName?: string;
}

/**
 * Provides reusable polling behavior for asynchronous and
 * eventually consistent operations.
 *
 * Responsibilities:
 * - Repeatedly evaluate an asynchronous condition
 * - Stop immediately when the expected condition is satisfied
 * - Enforce a configurable timeout
 * - Control the polling interval
 * - Log polling progress without exposing sensitive data
 * - Convert polling timeouts into framework-level errors
 *
 * This utility is intentionally transport-agnostic. It does not know
 * whether the condition is backed by an API, database, message queue,
 * event stream, WebSocket, or another asynchronous system.
 *
 * RetryUtil and PollingUtil serve different purposes:
 *
 * RetryUtil:
 *   Used when an operation fails and should be attempted again.
 *
 * PollingUtil:
 *   Used when an operation can be queried repeatedly until the
 *   expected state becomes available.
 */
export class PollingUtil {

    /**
     * Waits until the supplied asynchronous condition evaluates to true
     * or the configured timeout is reached.
     *
     * @param condition - Asynchronous condition evaluated on each poll.
     * @param options - Polling timeout, interval, and diagnostic options.
     * @returns Resolves when the expected condition becomes true.
     * @throws FrameworkError when the timeout is exceeded.
     */
    static async waitUntil(
        condition: () => Promise<boolean>,
        options: PollingOptions = {}
    ): Promise<void> {

        const {
            timeoutMs = 30000,
            intervalMs = 2000,
            operationName = "condition"
        } = options;

        const startTime = Date.now();
        let attempt = 0;

        Logger.info(
            `Starting polling for: ${operationName}`
        );

        while (Date.now() - startTime < timeoutMs) {

            attempt++;

            try {

                const conditionMet = await condition();

                if (conditionMet) {

                    const elapsedTime =
                        Date.now() - startTime;

                    Logger.info(
                        `${operationName} satisfied after ` +
                        `${attempt} polling attempt(s) ` +
                        `in ${elapsedTime}ms.`
                    );

                    return;
                }

                Logger.debug(
                    `${operationName} not satisfied. ` +
                    `Polling attempt ${attempt}.`
                );

            } catch (error) {

                Logger.warn(
                    `${operationName} polling attempt ` +
                    `${attempt} encountered an error.`
                );
            }

            const elapsedTime =
                Date.now() - startTime;

            const remainingTime =
                timeoutMs - elapsedTime;

            if (remainingTime <= 0) {
                break;
            }

            await this.sleep(
                Math.min(intervalMs, remainingTime)
            );
        }

        const elapsedTime =
            Date.now() - startTime;

        Logger.error(
            `${operationName} was not satisfied within ` +
            `${timeoutMs}ms.`
        );

        throw new FrameworkError(
            `${operationName} was not satisfied within ` +
            `${timeoutMs}ms.`,
            {
                cause: new Error(
                    `Polling timed out after ${elapsedTime}ms ` +
                    `and ${attempt} attempt(s).`
                )
            }
        );
    }

    /**
     * Pauses execution between polling attempts without blocking
     * the Node.js event loop.
     */
    private static async sleep(
        delayMs: number
    ): Promise<void> {

        await new Promise<void>((resolve) => {
            setTimeout(resolve, delayMs);
        });
    }
}

