import { test, expect } from "@fixtures/mobile.fixture";

/**
 * Integration tests for the mobile driver lifecycle.
 *
 * Unlike mobile-fixture.spec.ts, these tests intentionally require:
 * - A running Appium server
 * - UiAutomator2 Appium driver
 * - A running Android emulator/device
 *
 * The test validates the framework's complete path from:
 *
 * MobileConfig
 *      ↓
 * MobileDriverManager
 *      ↓
 * WebdriverIO
 *      ↓
 * Appium
 *      ↓
 * UiAutomator2
 *      ↓
 * Android Emulator
 */
test.describe("Mobile Driver Lifecycle", () => {

    /**
     * Mobile session startup can take longer than a normal web test.
     *
     * Appium may need to communicate with the emulator and initialize
     * the UiAutomator2 server before the WebdriverIO session becomes
     * available. Allow additional time for real-device integration tests.
     */
    test.setTimeout(120_000);

    test.beforeEach(() => {
        process.env.MOBILE_PLATFORM = "Android";
        process.env.MOBILE_DEVICE_NAME = "emulator-5554";
        process.env.MOBILE_AUTOMATION_NAME = "UiAutomator2";
        process.env.APPIUM_SERVER_URL =
            "http://127.0.0.1:4723";
    });

    test.afterEach(() => {
        delete process.env.MOBILE_PLATFORM;
        delete process.env.MOBILE_DEVICE_NAME;
        delete process.env.MOBILE_AUTOMATION_NAME;
        delete process.env.APPIUM_SERVER_URL;
    });

    test("should start and expose an active mobile driver", async ({
        mobileConfig,
        mobileDriverManager
    }) => {
        const driver =
            await mobileDriverManager.start(mobileConfig);

        expect(driver).toBeDefined();

        expect(
            mobileDriverManager.getDriver()
        ).toBe(driver);
    });

    test("should stop the active mobile driver cleanly", async ({
        mobileConfig,
        mobileDriverManager
    }) => {
        await mobileDriverManager.start(mobileConfig);

        expect(
            mobileDriverManager.getDriver()
        ).toBeDefined();

        await mobileDriverManager.stop();

        expect(() =>
            mobileDriverManager.getDriver()
        ).toThrow(
            "Mobile driver session has not been started."
        );
    });
});
