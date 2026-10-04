import { test, expect } from "@fixtures/mobile.fixture";

/**
 * Verifies that the mobile fixture exposes validated configuration
 * to tests without requiring an active Appium session.
 */
test.describe("Mobile Fixture", () => {

    test.beforeEach(() => {
        process.env.MOBILE_PLATFORM = "Android";
        process.env.MOBILE_DEVICE_NAME = "Android Emulator";
        process.env.APPIUM_SERVER_URL = "http://127.0.0.1:4723";
    });

    test.afterEach(() => {
        delete process.env.MOBILE_PLATFORM;
        delete process.env.MOBILE_DEVICE_NAME;
        delete process.env.APPIUM_SERVER_URL;
    });

    test("should expose mobile configuration to the test", async ({
        mobileConfig
    }) => {
        expect(mobileConfig.platformName).toBe("Android");
        expect(mobileConfig.deviceName).toBe("Android Emulator");
        expect(mobileConfig.appiumServerUrl)
            .toBe("http://127.0.0.1:4723");
    });

    test("should expose the mobile driver manager", async ({
        mobileDriverManager
    }) => {
        expect(mobileDriverManager).toBeDefined();
    });
});