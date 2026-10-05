import { Browser } from "webdriverio";

import { FrameworkError } from "@common/errors/FrameworkError";
import { Logger } from "@logger/Logger";

/**
 * BaseMobileScreen
 *
 * Provides reusable mobile-screen interactions for Android and iOS
 * page/screen objects.
 *
 * Architectural responsibility:
 * - Own common mobile UI interaction behavior
 * - Keep WebdriverIO interaction details out of individual screen classes
 * - Provide consistent logging and framework-level error handling
 * - Provide reusable synchronization methods
 * - Provide debugging utilities such as screenshots
 *
 * This class does NOT:
 * - Create an Appium session
 * - Start or stop the mobile driver
 * - Load environment configuration
 * - Contain application-specific locators
 *
 * MobileDriverManager owns session lifecycle.
 * MobileConfigManager owns configuration.
 * Concrete screen classes own application-specific locators and workflows.
 *
 * Architecture:
 *
 * Mobile Test
 *      ↓
 * Concrete Mobile Screen
 *      ↓
 * BaseMobileScreen
 *      ↓
 * WebdriverIO Driver
 *      ↓
 * Appium
 *      ↓
 * Android / iOS
 */
export abstract class BaseMobileScreen {

    /**
     * Active WebdriverIO mobile driver.
     *
     * The driver is injected by the test/fixture layer rather than
     * created inside the screen object. This keeps driver lifecycle
     * centralized in MobileDriverManager.
     */
    protected readonly driver: Browser;

    /**
     * Creates a base mobile screen using an already initialized driver.
     *
     * @param driver Active WebdriverIO/Appium mobile driver.
     */
    protected constructor(driver: Browser) {

        if (!driver) {
            throw new FrameworkError(
                "Cannot create mobile screen without an active driver."
            );
        }

        this.driver = driver;
    }

    /**
     * Finds a mobile element using a WebdriverIO selector.
     *
     * Keeping element lookup centralized gives the framework a single
     * place to add future enhancements such as logging, retries,
     * accessibility-aware lookup, or AI locator healing.
     *
     * @param selector WebdriverIO-compatible selector.
     */
    protected async getElement(
        selector: string
    ) {

        if (!selector?.trim()) {
            throw new FrameworkError(
                "Mobile element selector cannot be empty."
            );
        }

        try {

            return await this.driver.$(selector);

        } catch (error) {

            Logger.error(
                `Failed to locate mobile element: ${selector}`
            );

            throw new FrameworkError(
                `Failed to locate mobile element: ${selector}`,
                {
                    cause: error
                }
            );
        }
    }

    /**
     * Waits for an element to become displayed.
     *
     * Explicit synchronization is preferred over arbitrary sleeps
     * because mobile applications can have variable startup and
     * rendering times.
     *
     * @param selector WebdriverIO-compatible selector.
     * @param timeout Maximum wait time in milliseconds.
     */
    protected async waitForVisible(
        selector: string,
        timeout = 10_000
    ) {

        const element =
            await this.getElement(selector);

        try {

            await element.waitForDisplayed({
                timeout
            });

            return element;

        } catch (error) {

            Logger.error(
                `Mobile element did not become visible: ${selector}`
            );

            throw new FrameworkError(
                `Mobile element did not become visible within ${timeout}ms: ${selector}`,
                {
                    cause: error
                }
            );
        }
    }

    /**
     * Taps a visible mobile element.
     *
     * @param selector WebdriverIO-compatible selector.
     */
    protected async tap(
        selector: string
    ): Promise<void> {

        const element =
            await this.waitForVisible(selector);

        try {

            Logger.info(
                `Tapping mobile element: ${selector}`
            );

            await element.click();

        } catch (error) {

            Logger.error(
                `Failed to tap mobile element: ${selector}`
            );

            throw new FrameworkError(
                `Failed to tap mobile element: ${selector}`,
                {
                    cause: error
                }
            );
        }
    }

    /**
     * Clears an existing mobile text field.
     *
     * @param selector WebdriverIO-compatible selector.
     */
    protected async clearText(
        selector: string
    ): Promise<void> {

        const element =
            await this.waitForVisible(selector);

        try {

            Logger.info(
                `Clearing mobile text field: ${selector}`
            );

            await element.clearValue();

        } catch (error) {

            Logger.error(
                `Failed to clear mobile text field: ${selector}`
            );

            throw new FrameworkError(
                `Failed to clear mobile text field: ${selector}`,
                {
                    cause: error
                }
            );
        }
    }

    /**
     * Enters text into a mobile input field.
     *
     * The field is cleared before typing so tests do not accidentally
     * depend on stale text from a previous state.
     *
     * @param selector WebdriverIO-compatible selector.
     * @param value Text to enter.
     */
    protected async typeText(
        selector: string,
        value: string
    ): Promise<void> {

        const element =
            await this.waitForVisible(selector);

        try {

            Logger.info(
                `Entering text into mobile field: ${selector}`
            );

            await element.clearValue();
            await element.setValue(value);

        } catch (error) {

            Logger.error(
                `Failed to enter text into mobile field: ${selector}`
            );

            throw new FrameworkError(
                `Failed to enter text into mobile field: ${selector}`,
                {
                    cause: error
                }
            );
        }
    }

    /**
     * Returns the visible text from a mobile element.
     *
     * @param selector WebdriverIO-compatible selector.
     */
    protected async getText(
        selector: string
    ): Promise<string> {

        const element =
            await this.waitForVisible(selector);

        try {

            return await element.getText();

        } catch (error) {

            Logger.error(
                `Failed to read text from mobile element: ${selector}`
            );

            throw new FrameworkError(
                `Failed to read text from mobile element: ${selector}`,
                {
                    cause: error
                }
            );
        }
    }

    /**
     * Determines whether an element is currently displayed.
     *
     * Unlike waitForVisible(), this method does not fail when the
     * element is absent. This makes it useful for conditional UI
     * validation.
     *
     * @param selector WebdriverIO-compatible selector.
     */
    protected async isDisplayed(
        selector: string
    ): Promise<boolean> {

        try {

            const element =
                await this.getElement(selector);

            return await element.isDisplayed();

        } catch (error) {

            Logger.warn(
                `Mobile element is not displayed: ${selector}`
            );

            return false;
        }
    }

    /**
     * Hides the mobile keyboard when supported by the active driver.
     *
     * This is intentionally handled by the screen abstraction so
     * individual tests do not need direct WebdriverIO commands.
     */
    protected async hideKeyboard(): Promise<void> {

        try {

            Logger.info(
                "Hiding mobile keyboard."
            );

            await this.driver.hideKeyboard();

        } catch (error) {

            Logger.warn(
                "Mobile keyboard could not be hidden."
            );
        }
    }

    /**
     * Captures a screenshot using the active mobile driver.
     *
     * Screenshots are useful for failure analysis, debugging,
     * reporting, and future AI visual-analysis capabilities.
     *
     * @param name Logical name used in the log message.
     */
    protected async takeScreenshot(
        name: string
    ): Promise<string> {

        if (!name?.trim()) {
            throw new FrameworkError(
                "Mobile screenshot name cannot be empty."
            );
        }

        try {

            Logger.info(
                `Capturing mobile screenshot: ${name}`
            );

            return await this.driver.takeScreenshot();

        } catch (error) {

            Logger.error(
                `Failed to capture mobile screenshot: ${name}`
            );

            throw new FrameworkError(
                `Failed to capture mobile screenshot: ${name}`,
                {
                    cause: error
                }
            );
        }
    }
}