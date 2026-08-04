import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {

        super(page);

        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.loginButton = page.locator("#submit");
    }

    async open(): Promise<void> {
        await this.navigate(
            "https://practicetestautomation.com/practice-test-login/"
        );
    }

    async login(username: string, password: string): Promise<void> {

        await this.username.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();
    }

    async verifySuccessfulLogin(): Promise<void> {

        await expect(this.page).toHaveURL(/logged-in-successfully/);

    }

}