import { test, expect } from "@playwright/test";

import { BaseMobileScreen } from "@core/mobile/screens/BaseMobileScreen";

/**
 * Minimal mock WebdriverIO element used to test the screen abstraction
 * without requiring an active Appium session.
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
 * Minimal mock mobile driver.
 *
 * BaseMobileScreen receives an already-created driver, so the screen
 * abstraction should be testable independently from Appium and the
 * Android/iOS environment.
 */
const createMockDriver = () => {

    const element = new MockMobileElement();

    return {
        $: async (_selector: string) => element,

        hideKeyboard: async () => undefined,

        takeScreenshot: async () => "mock-screenshot-data"
    };
};

/**
 * Concrete test implementation of BaseMobileScreen.
 *
 * BaseMobileScreen remains abstract because production screen objects
 * should extend it and define application-specific behavior.
 */
class TestMobileScreen extends BaseMobileScreen {

    constructor(driver: any) {
        super(driver);
    }

    /**
     * Exposes the protected getElement() method for testing.
     */
    async findElement(selector: string) {
        return this.getElement(selector);
    }

    /**
     * Exposes the protected waitForVisible() method for testing.
     */
    async waitForElement(
        selector: string,
        timeout?: number
    ) {
        return this.waitForVisible(selector, timeout);
    }

    /**
     * Exposes the protected tap() method for testing.
     */
    async tapElement(selector: string): Promise<void> {
        return this.tap(selector);
    }

    /**
     * Exposes the protected clearText() method for testing.
     */
    async clearElement(selector: string): Promise<void> {
        return this.clearText(selector);
    }

    /**
     * Exposes the protected typeText() method for testing.
     */
    async typeIntoElement(
        selector: string,
        text: string
    ): Promise<void> {
        return this.typeText(selector, text);
    }

    /**
     * Exposes the protected getText() method for testing.
     */
    async readElementText(selector: string): Promise<string> {
        return this.getText(selector);
    }

    /**
     * Exposes the protected isDisplayed() method for testing.
     */
    async checkDisplayed(selector: string): Promise<boolean> {
        return this.isDisplayed(selector);
    }

    /**
     * Exposes the protected hideKeyboard() method for testing.
     */
    async dismissKeyboard(): Promise<void> {
        return this.hideKeyboard();
    }

    /**
     * Exposes the protected takeScreenshot() method for testing.
     */
    async captureScreenshot(name: string): Promise<string> {
        return this.takeScreenshot(name);
    }
}

/**
 * Base Mobile Screen tests.
 *
 * These tests validate the reusable screen abstraction independently
 * from Appium, an emulator, or a physical mobile device.
 */
test.describe("Base Mobile Screen", () => {

    test("should create a mobile screen with an injected driver", () => {

        const driver = createMockDriver();

        const screen =
            new TestMobileScreen(driver);

        expect(screen).toBeDefined();
    });

    test("should find a mobile element", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        const element =
            await screen.findElement("~loginButton");

        expect(element).toBeDefined();
    });

    test("should wait for a mobile element to become visible", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        const element =
            await screen.waitForElement("~loginButton");

        expect(element).toBeDefined();
    });

    test("should tap a mobile element", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        await expect(
            screen.tapElement("~loginButton")
        ).resolves.toBeUndefined();
    });

    test("should clear a mobile text field", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        await expect(
            screen.clearElement("~username")
        ).resolves.toBeUndefined();
    });

    test("should enter text into a mobile field", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        await expect(
            screen.typeIntoElement(
                "~username",
                "test-user"
            )
        ).resolves.toBeUndefined();
    });

    test("should retrieve text from a mobile element", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        const text =
            await screen.readElementText(
                "~welcomeMessage"
            );

        expect(text).toBe("Mock mobile element");
    });

    test("should determine whether an element is displayed", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        const displayed =
            await screen.checkDisplayed(
                "~loginButton"
            );

        expect(displayed).toBe(true);
    });

    test("should hide the mobile keyboard", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        await expect(
            screen.dismissKeyboard()
        ).resolves.toBeUndefined();
    });

    test("should capture a mobile screenshot", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        const screenshot =
            await screen.captureScreenshot(
                "login-screen"
            );

        expect(screenshot).toBe(
            "mock-screenshot-data"
        );
    });

    test("should reject an empty mobile selector", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        await expect(
            screen.findElement("   ")
        ).rejects.toThrow(
            "Mobile element selector cannot be empty."
        );
    });

    test("should reject an empty screenshot name", async () => {

        const driver = createMockDriver();
        const screen = new TestMobileScreen(driver);

        await expect(
            screen.captureScreenshot("   ")
        ).rejects.toThrow(
            "Mobile screenshot name cannot be empty."
        );
    });
});