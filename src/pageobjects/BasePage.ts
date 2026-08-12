import { Page } from "@playwright/test";
import { ConfigManager } from "@config/config.manager";
import { Logger } from "@logger/Logger";

/**
 * Base class for all application Page Objects.
 *
 * Provides common browser interactions that can be reused by
 * individual Page Objects.
 *
 * Responsibilities:
 * - Stores the Playwright Page instance.
 * - Provides environment-aware navigation.
 * - Provides common page-level operations.
 */
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
        
        Logger.info(`Navigating to: ${targetUrl}`);

        await this.page.goto(targetUrl);

        Logger.debug(`Navigation completed: ${targetUrl}`);
    }

    async getTitle(): Promise<string> {

        return await this.page.title();
    }
}