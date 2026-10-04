import { FrameworkError } from "@common/errors/FrameworkError";
import { Logger } from "@logger/Logger";
import { MobileConfig } from "@core/mobile/config/MobileConfig";

/**
 * Centralizes mobile configuration loading and validation.
 *
 * Responsibilities:
 * - Read Android/iOS settings from environment variables
 * - Apply a default local Appium server URL
 * - Validate required settings before a session is started
 * - Keep environment-specific configuration out of test files
 *
 * This manager does not start Appium or connect to a device.
 * MobileDriverManager owns the runtime session lifecycle.
 */
export class MobileConfigManager {

    /**
     * Loads and validates mobile configuration from environment variables.
     *
     * Required:
     * - MOBILE_PLATFORM: Android or iOS
     * - MOBILE_DEVICE_NAME: emulator, simulator, or device name
     *
     * Optional:
     * - APPIUM_SERVER_URL
     * - MOBILE_APP_IDENTIFIER
     * - MOBILE_APP_PATH
     * - MOBILE_AUTOMATION_NAME
     */
    static getConfig(): MobileConfig {
        const platformValue =
            process.env.MOBILE_PLATFORM?.trim();

        const deviceName =
            process.env.MOBILE_DEVICE_NAME?.trim();

        const appiumServerUrl =
            process.env.APPIUM_SERVER_URL?.trim() ||
            "http://127.0.0.1:4723";

        const appIdentifier =
            process.env.MOBILE_APP_IDENTIFIER?.trim();

        const appPath =
            process.env.MOBILE_APP_PATH?.trim();

        const automationName =
            process.env.MOBILE_AUTOMATION_NAME?.trim();

        if (
            platformValue !== "Android" &&
            platformValue !== "iOS"
        ) {
            throw new FrameworkError(
                "Invalid mobile platform. Set MOBILE_PLATFORM to Android or iOS."
            );
        }

        if (!deviceName) {
            throw new FrameworkError(
                "Missing mobile device name. Set MOBILE_DEVICE_NAME."
            );
        }

        /**
         * Validate the URL early so malformed configuration fails
         * before MobileDriverManager attempts to start a session.
         */
        try {
            const parsedUrl = new URL(appiumServerUrl);

            if (
                parsedUrl.protocol !== "http:" &&
                parsedUrl.protocol !== "https:"
            ) {
                throw new Error("Unsupported URL protocol.");
            }
        } catch (error) {
            Logger.error("Invalid Appium server URL.");

            throw new FrameworkError(
                "Invalid APPIUM_SERVER_URL. Provide a valid HTTP or HTTPS URL.",
                { cause: error }
            );
        }

        const config: MobileConfig = {
            platformName: platformValue,
            deviceName,
            appiumServerUrl,

            ...(appIdentifier && { appIdentifier }),
            ...(appPath && { appPath }),
            ...(automationName && { automationName })
        };

        Logger.info(
            `Mobile configuration loaded for ${config.platformName}.`
        );

        // Do not log app identifiers, paths, or other environment values.
        return config;
    }
}