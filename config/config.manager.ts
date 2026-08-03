import { environments, EnvironmentConfig } from "./env.config";

export class ConfigManager {

    static getEnvironment(): EnvironmentConfig {

        const env = process.env.TEST_ENV || "qa";

        const config = environments[env];

        if (!config) {
            throw new Error(
                `Environment '${env}' is not configured`
            );
        }

        return config;
    }
}