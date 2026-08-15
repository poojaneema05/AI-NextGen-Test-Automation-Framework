/**
 * Represents an error originating from the test automation framework.
 *
 * FrameworkError provides a consistent error type for framework-level
 * failures while preserving the original error as the cause.
 */
export class FrameworkError extends Error {

    constructor(
        message: string,
        options?: { cause?: unknown }
    ) {
        super(message, options);

        this.name = "FrameworkError";
    }
}