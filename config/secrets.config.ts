import { FrameworkError } from "@common/errors/FrameworkError";
import { Logger } from "@logger/Logger";

/**
 * Represents credentials required by the API automation layer.
 *
 * Secrets are sourced from environment variables rather than being
 * stored in source-controlled configuration files.
 */
export interface SecretsConfig {
    bookerUsername: string;
    bookerPassword: string;
}

/**
 * Provides centralized access to framework secrets.
 *
 * Responsibilities:
 * - Read secrets from environment variables
 * - Validate required secrets
 * - Prevent API components from depending directly on process.env
 *
 * This class does not log secret values.
 */
export class SecretsConfigManager {

    static getSecrets(): SecretsConfig {

        const bookerUsername =
            process.env.BOOKER_USERNAME;

        const bookerPassword =
            process.env.BOOKER_PASSWORD;

        if (!bookerUsername || !bookerPassword) {

            Logger.error(
                "Required API credentials are not configured."
            );

            throw new FrameworkError(
                "Required API credentials are not configured. " +
                "Set BOOKER_USERNAME and BOOKER_PASSWORD."
            );
        }

        return {
            bookerUsername,
            bookerPassword
        };
    }
}
