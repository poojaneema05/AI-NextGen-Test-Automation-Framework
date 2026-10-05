import { test, expect } from "@playwright/test";
import { Browser } from "webdriverio";

import { LoginScreen } from "@mobile/pages/LoginScreen";

/**
 * Minimal mock WebdriverIO element used to exercise LoginScreen
 * without requiring a real Appium session.
 */
class MockMobileElement {

    async waitForDisplayed(): Promise<void> {
        return;
    }

    async click(): Promise<void> {
        return;
    }

    async clearValue(): Promise<void> {
        return;
    }

    async setValue(_value: string): Promise<void> {
        return;
    }

    async getText(): Promise<string> {
        return "Mock mobile element";
    }

    async isDisplayed(): Promise<boolean> {
        return true;
    }
}

/**
 * Minimal mock driver used by LoginScreen tests.
 *
 * The real framework injects a WebdriverIO/Appium driver. The mock
 * allows the screen-object behavior to be tested independently from
 * the device and Appium infrastructure.
 */
const createMockDriver = (): Browser => {

    const element = new MockMobileElement();

    return {
        $: async (_selector: string) => element,

        hideKeyboard: async () => undefined,

        takeScreenshot: async () => "mock-screenshot-data"
    } as unknown as Browser;
};

test.describe("Login Screen", () => {

    test("should create the login screen with an injected driver", () => {

        const driver = createMockDriver();

        const loginScreen =
            new LoginScreen(driver);

        expect(loginScreen).toBeDefined();
    });

    test("should determine whether the login screen is displayed", async () => {

        const driver = createMockDriver();

        const loginScreen =
            new LoginScreen(driver);

        const displayed =
            await loginScreen.isLoginScreenDisplayed();

        expect(displayed).toBe(true);
    });

    test("should enter a username", async () => {

        const driver = createMockDriver();

        const loginScreen =
            new LoginScreen(driver);

        await expect(
            loginScreen.enterUsername("test-user")
        ).resolves.toBeUndefined();
    });

    test("should enter a password", async () => {

        const driver = createMockDriver();

        const loginScreen =
            new LoginScreen(driver);

        await expect(
            loginScreen.enterPassword("test-password")
        ).resolves.toBeUndefined();
    });

    test("should tap the login button", async () => {

        const driver = createMockDriver();

        const loginScreen =
            new LoginScreen(driver);

        await expect(
            loginScreen.tapLogin()
        ).resolves.toBeUndefined();
    });

    test("should perform the complete login workflow", async () => {

        const driver = createMockDriver();

        const loginScreen =
            new LoginScreen(driver);

        await expect(
            loginScreen.login(
                "test-user",
                "test-password"
            )
        ).resolves.toBeUndefined();
    });
});