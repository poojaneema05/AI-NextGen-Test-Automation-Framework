import dotenv from "dotenv";

import { FrameworkError } from "@common/errors/FrameworkError";
import { environments, EnvironmentConfig } from "./env.config";
import { Logger } from "@logger/Logger";

/**
 * Provides centralized access to the active test environment configuration.
 *
 * Responsibilities:
 * - Load environment variables before configuration is consumed
 * - Select the active test environment using TEST_ENV
 * - Validate that the requested environment is configured
 * - Provide a single configuration access point for the framework
 *
 * Secrets are intentionally not stored in env.config.ts.
 * They are loaded from environment files and accessed through
 * process.env by the configuration layer.
 */
export class ConfigManager {

    private static initialized = false;

    /**
     * Loads the framework environment configuration once.
     *
     * The base .env file is loaded first, followed by the
     * environment-specific file such as .env.qa or .env.dev.
     *
     * Environment-specific values can therefore override
     * shared/default values.
     */
    private static initialize(): void {

        if (this.initialized) {
            return;
        }

        const env = process.env.TEST_ENV || "qa";

        dotenv.config({
            path: ".env"
        });

        dotenv.config({
            path: `.env.${env}`,
            override: true
        });

        this.initialized = true;

        Logger.info(
            `Environment variables loaded for: ${env}`
        );
    }

    static getEnvironment(): EnvironmentConfig {

        this.initialize();

        const env = process.env.TEST_ENV || "qa";

        Logger.info(`Using environment: ${env}`);

        const config = environments[env];

        if (!config) {

            Logger.error(
                `Environment '${env}' is not configured`
            );

            throw new FrameworkError(
                `Environment '${env}' is not configured`
            );
        }

        Logger.debug(
            `Loaded configuration for environment: ${env}`
        );

        return config;
    }
}
