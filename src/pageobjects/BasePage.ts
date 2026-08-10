import { Page } from "@playwright/test";

import { ConfigManager } from "@config/config.manager";

export abstract class BasePage {

    protected readonly page: Page;

    protected readonly config =
        ConfigManager.getEnvironment();

    constructor(page: Page) {

        this.page = page;
    }

    async navigate(url: string): Promise<void> {

        const targetUrl =
            url.startsWith("http")
                ? url
                : `${this.config.baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

        await this.page.goto(targetUrl);
    }

    async getTitle(): Promise<string> {

        return await this.page.title();
    }
}