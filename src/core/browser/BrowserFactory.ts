import {
    chromium,
    firefox,
    webkit,
    Browser
} from "@playwright/test";

import { ConfigManager } from "@config/config.manager";
import { Logger } from "@logger/Logger";
import { FrameworkError } from "@common/errors/FrameworkError";

/**
 * Creates Playwright browser instances based on the active environment configuration.
 *
 * BrowserFactory is responsible only for browser creation.
 * Browser lifecycle management is handled by DriverManager.
 */
export class BrowserFactory {

    static async createBrowser(): Promise<Browser> {

        let browserType = "unknown";

        // Wrap browser creation failures so the framework reports
        // a consistent, actionable error message.
        try {

            const config = ConfigManager.getEnvironment();

            browserType = config.browser;

            // Browser type and headless mode are controlled by the active environment configuration.
            Logger.info(
                `Creating ${config.browser} browser (headless: ${config.headless})`
            );

            switch (config.browser) {

                case "firefox":

                    Logger.debug("Launching Firefox browser");

                    return await firefox.launch({
                        headless: config.headless
                    });


                case "webkit":

                    Logger.debug("Launching WebKit browser");

                    return await webkit.launch({
                        headless: config.headless
                    });


                case "chromium":
                default:

                    Logger.debug("Launching Chromium browser");

                    return await chromium.launch({
                        headless: config.headless
                    });
            }

        } catch (error) {

            Logger.error(
                `Failed to create ${browserType} browser`
            );

            throw new FrameworkError(
                `Failed to create ${browserType} browser.`,
                { cause: error }
            );
        }
    }
}