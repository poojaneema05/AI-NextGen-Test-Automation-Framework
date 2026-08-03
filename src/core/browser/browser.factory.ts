import {
    chromium,
    firefox,
    webkit,
    Browser
} from "@playwright/test";

import { ConfigManager } from "@config/config.manager";


export class BrowserFactory {

    static async createBrowser(): Promise<Browser> {

        const config = ConfigManager.getEnvironment();

        switch (config.browser) {

            case "firefox":

                return await firefox.launch({
                    headless: config.headless
                });


            case "webkit":

                return await webkit.launch({
                    headless: config.headless
                });


            case "chromium":
            default:

                return await chromium.launch({
                    headless: config.headless
                });
        }
    }
}