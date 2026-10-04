import { remote, Browser } from "webdriverio";
import { IMobileDriver } from "@core/mobile/driver/IMobileDriver";
import { FrameworkError } from "@common/errors/FrameworkError";
import { Logger } from "@logger/Logger";
import { MobileConfig } from "@core/mobile/config/MobileConfig";

/**
 * Manages the lifecycle of a mobile automation session.
 *
 * Responsibilities:
 * - Create an Appium session from framework-level configuration
 * - Expose the active mobile driver to framework components
 * - Prevent tests from depending directly on WebdriverIO/Appium setup
 * - Provide a centralized place for future device/cloud-provider support
 * - Cleanly terminate the mobile session after execution
 *
 * The manager intentionally owns driver lifecycle, while MobileConfig
 * owns configuration. This separation keeps device configuration and
 * runtime behavior independently replaceable.
 */
export class MobileDriverManager implements IMobileDriver {

    private driver: Browser | null = null;

    /**
     * Creates a new Appium mobile session.
     *
     * The framework configuration is translated into WebdriverIO
     * capabilities here so individual tests remain platform-agnostic.
     */
    async start(config: MobileConfig): Promise<Browser> {

        if (this.driver) {

            Logger.warn(
                "Mobile driver session is already active."
            );

            return this.driver;
        }

        try {

            Logger.info(
                `Starting mobile session: ` +
                `${config.platformName} / ${config.deviceName}`
            );

            /**
             * Build capabilities independently from the WebdriverIO
             * connection configuration.
             *
             * Conditional properties are added only when they apply to
             * the selected platform. This is important because the
             * project uses exactOptionalPropertyTypes, which does not
             * allow optional properties to be explicitly assigned
             * undefined.
             */
            const capabilities: Record<string, unknown> = {

                platformName: config.platformName,

                "appium:deviceName":
                    config.deviceName,

                ...(config.automationName && {
                    "appium:automationName":
                        config.automationName
                }),

                ...(config.appIdentifier &&
                    config.platformName === "Android" && {
                        "appium:appPackage":
                            config.appIdentifier
                    }),

                ...(config.appIdentifier &&
                    config.platformName === "iOS" && {
                        "appium:bundleId":
                            config.appIdentifier
                    }),

                ...(config.appPath && {
                    "appium:app":
                        config.appPath
                }),

                ...config.capabilities
            };

            /**
             * Create the WebdriverIO session.
             *
             * The Appium server URL is parsed here rather than exposing
             * hostname, port, and path details to the test layer.
             */
            const appiumUrl =
                new URL(config.appiumServerUrl);

            this.driver = await remote({

                hostname: appiumUrl.hostname,

                port:
                    Number(appiumUrl.port) || 4723,

                path:
                    appiumUrl.pathname || "/",

                capabilities
            });

            Logger.info(
                "Mobile driver session started successfully."
            );

            return this.driver;

        } catch (error) {

            Logger.error(
                "Failed to start mobile driver session."
            );

            throw new FrameworkError(
                "Failed to start mobile driver session.",
                {
                    cause: error
                }
            );
        }
    }

    /**
     * Returns the active mobile driver.
     *
     * A framework-level error is thrown when a test attempts to use
     * the driver before a session has been initialized.
     */
    getDriver(): Browser {

        if (!this.driver) {

            throw new FrameworkError(
                "Mobile driver session has not been started."
            );
        }

        return this.driver;
    }

    /**
     * Terminates the active mobile session.
     *
     * Cleanup is intentionally safe to call even when no session exists,
     * which allows hooks to perform unconditional teardown.
     */
    async stop(): Promise<void> {

        if (!this.driver) {
            return;
        }

        try {

            await this.driver.deleteSession();

            Logger.info(
                "Mobile driver session stopped successfully."
            );

        } catch (error) {

            Logger.error(
                "Failed to stop mobile driver session."
            );

            throw new FrameworkError(
                "Failed to stop mobile driver session.",
                {
                    cause: error
                }
            );

        } finally {

            this.driver = null;
        }
    }
}
