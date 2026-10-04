
import { test as base } from "@playwright/test";

import { MobileConfig } from "@core/mobile/config/MobileConfig";
import { MobileConfigManager } from "@core/mobile/config/MobileConfigManager";
import { MobileDriverManager } from "@core/mobile/driver/MobileDriverManager";

type MobileFixtures = {
    mobileConfig: MobileConfig;
    mobileDriverManager: MobileDriverManager;
};

/**
 * Playwright fixtures for mobile automation.
 *
 * The fixture separates mobile configuration from mobile session
 * lifecycle. Tests can consume validated configuration without
 * automatically starting an Appium session.
 *
 * This is intentional: the framework's unit/configuration tests
 * should remain independent of a physical device, emulator,
 * simulator, or running Appium server.
 */
export const test =
    base.extend<MobileFixtures>({
        mobileConfig: async ({}, use) => {
            const mobileConfig =
                MobileConfigManager.getConfig();

            await use(mobileConfig);
        },

        mobileDriverManager: async ({}, use) => {
            const mobileDriverManager =
                new MobileDriverManager();

            try {
                await use(mobileDriverManager);
            } finally {
                /**
                 * Cleanup is safe even when a test never starts
                 * a mobile session.
                 */
                await mobileDriverManager.stop();
            }
        }
    });

export { expect } from "@playwright/test";