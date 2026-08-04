import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await this.navigate("https://example.com");
    }

    async verifyTitle(): Promise<void> {
        await expect(this.page).toHaveTitle(/Example/);
    }

}