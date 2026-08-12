import { environments, EnvironmentConfig } from "./env.config";
import { Logger } from "@logger/Logger";

/**
 * Provides centralized access to the active test environment configuration.
 *
 * The environment is selected using the TEST_ENV environment variable.
 * If TEST_ENV is not provided, the framework defaults to QA.
 */
export class ConfigManager {

    static getEnvironment(): EnvironmentConfig {

        const env = process.env.TEST_ENV || "qa";

        Logger.info(`Using environment: ${env}`);

        const config = environments[env];

        if (!config) {

            Logger.error(
                `Environment '${env}' is not configured`
            );

            throw new Error(
                `Environment '${env}' is not configured`
            );
        }

        Logger.debug(
            `Loaded configuration for environment: ${env}`
        );

        return config;
    }
}