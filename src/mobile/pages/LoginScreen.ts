import { Browser } from "webdriverio";

import { BaseMobileScreen } from "@core/mobile/screens/BaseMobileScreen";

/**
 * LoginScreen
 *
 * Represents a typical mobile login screen.
 *
 * Architectural responsibility:
 * - Own login-screen-specific locators
 * - Expose business-level login actions
 * - Reuse common mobile interactions from BaseMobileScreen
 *
 * This class intentionally does not:
 * - Create or destroy the mobile driver
 * - Load environment configuration
 * - Contain test assertions
 * - Implement low-level WebdriverIO interaction logic
 *
 * Driver lifecycle remains the responsibility of MobileDriverManager.
 * Common mobile interactions remain the responsibility of
 * BaseMobileScreen.
 *
 * Locator note:
 * The selectors below are framework examples. A consuming application
 * should replace them with the application's real accessibility IDs,
 * resource IDs, XPath expressions, or other supported selectors.
 */
export class LoginScreen extends BaseMobileScreen {

    /**
     * Login screen locators.
     *
     * Accessibility IDs are preferred where the application provides
     * stable accessibility identifiers because they are generally more
     * resilient than XPath-based selectors.
     */
    private readonly usernameInput =
        "~username";

    private readonly passwordInput =
        "~password";

    private readonly loginButton =
        "~loginButton";

    private readonly loginScreenIndicator =
        "~loginScreen";

    /**
     * Creates the LoginScreen using an already initialized
     * WebdriverIO/Appium driver.
     *
     * @param driver Active mobile automation driver.
     */
    constructor(driver: Browser) {
        super(driver);
    }

    /**
     * Determines whether the login screen is currently displayed.
     *
     * This uses the non-failing isDisplayed() behavior from
     * BaseMobileScreen, making it suitable for conditional navigation
     * checks.
     */
    async isLoginScreenDisplayed(): Promise<boolean> {

        return this.checkElementDisplayed(
            this.loginScreenIndicator
        );
    }

    /**
     * Enters the username into the login form.
     *
     * Common text-field behavior such as waiting for visibility,
     * clearing stale content, logging, and error handling is inherited
     * from BaseMobileScreen.
     *
     * @param username Username to enter.
     */
    async enterUsername(
        username: string
    ): Promise<void> {

        await this.typeText(
            this.usernameInput,
            username
        );
    }

    /**
     * Enters the password into the login form.
     *
     * @param password Password to enter.
     */
    async enterPassword(
        password: string
    ): Promise<void> {

        await this.typeText(
            this.passwordInput,
            password
        );
    }

    /**
     * Taps the login button.
     */
    async tapLogin(): Promise<void> {

        await this.tap(
            this.loginButton
        );
    }

    /**
     * Performs the complete login workflow.
     *
     * Keeping this workflow inside the screen object allows tests
     * to express business intent rather than low-level UI actions.
     *
     * Example:
     *
     * await loginScreen.login(
     *     "test-user",
     *     "test-password"
     * );
     *
     * @param username Username to authenticate with.
     * @param password Password to authenticate with.
     */
    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.tapLogin();
    }

    /**
     * Exposes the common BaseMobileScreen visibility behavior to the
     * screen-specific implementation without exposing protected
     * framework methods directly to consumers.
     */
    private async checkElementDisplayed(
        selector: string
    ): Promise<boolean> {

        return this.isDisplayed(selector);
    }
}