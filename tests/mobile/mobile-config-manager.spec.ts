import { test, expect } from "@playwright/test";
import { MobileConfigManager } from "@core/mobile/config/MobileConfigManager";
import { FrameworkError } from "@common/errors/FrameworkError";

test.describe("MobileConfigManager", () => {
    const originalEnvironment = {
        MOBILE_PLATFORM: process.env.MOBILE_PLATFORM,
        MOBILE_DEVICE_NAME: process.env.MOBILE_DEVICE_NAME,
        APPIUM_SERVER_URL: process.env.APPIUM_SERVER_URL,
        MOBILE_APP_IDENTIFIER: process.env.MOBILE_APP_IDENTIFIER,
        MOBILE_APP_PATH: process.env.MOBILE_APP_PATH,
        MOBILE_AUTOMATION_NAME: process.env.MOBILE_AUTOMATION_NAME
    };

    test.beforeEach(() => {
        delete process.env.MOBILE_PLATFORM;
        delete process.env.MOBILE_DEVICE_NAME;
        delete process.env.APPIUM_SERVER_URL;
        delete process.env.MOBILE_APP_IDENTIFIER;
        delete process.env.MOBILE_APP_PATH;
        delete process.env.MOBILE_AUTOMATION_NAME;
    });

    test.afterAll(() => {
        for (const [key, value] of Object.entries(originalEnvironment)) {
            if (value === undefined) {
                delete process.env[key];
            } else {
                process.env[key] = value;
            }
        }
    });

    test("should load valid Android configuration", () => {
        process.env.MOBILE_PLATFORM = "Android";
        process.env.MOBILE_DEVICE_NAME = "Android Emulator";

        const config = MobileConfigManager.getConfig();

        expect(config.platformName).toBe("Android");
        expect(config.deviceName).toBe("Android Emulator");
        expect(config.appiumServerUrl).toBe("http://127.0.0.1:4723");
    });

    test("should load optional iOS configuration", () => {
        process.env.MOBILE_PLATFORM = "iOS";
        process.env.MOBILE_DEVICE_NAME = "iPhone Simulator";
        process.env.APPIUM_SERVER_URL = "http://localhost:4723";
        process.env.MOBILE_APP_IDENTIFIER = "com.example.app";
        process.env.MOBILE_AUTOMATION_NAME = "XCUITest";

        const config = MobileConfigManager.getConfig();

        expect(config.platformName).toBe("iOS");
        expect(config.appIdentifier).toBe("com.example.app");
        expect(config.automationName).toBe("XCUITest");
    });

    test("should reject an unsupported platform", () => {
        process.env.MOBILE_PLATFORM = "Windows";
        process.env.MOBILE_DEVICE_NAME = "Test Device";

        expect(() => MobileConfigManager.getConfig())
            .toThrow(FrameworkError);
    });

    test("should reject a missing device name", () => {
        process.env.MOBILE_PLATFORM = "Android";

        expect(() => MobileConfigManager.getConfig())
            .toThrow(FrameworkError);
    });

    test("should reject a malformed Appium server URL", () => {
        process.env.MOBILE_PLATFORM = "Android";
        process.env.MOBILE_DEVICE_NAME = "Android Emulator";
        process.env.APPIUM_SERVER_URL = "not-a-valid-url";

        expect(() => MobileConfigManager.getConfig())
            .toThrow(FrameworkError);
    });
});