import { Page } from "@playwright/test";
import { ConfigManager } from "@config/config.manager";
import { Logger } from "@logger/Logger";
import { FrameworkError } from "@common/errors/FrameworkError";

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

    /**
     * Navigates to the requested URL.
     *
     * Absolute URLs are used as provided. Relative URLs are resolved
     * against the active environment's base URL.
     *
     * Navigation failures are converted into FrameworkError while
     * preserving the original Playwright error as the cause.
     */
    async navigate(url: string): Promise<void> {

        const targetUrl =
            url.startsWith("http")
                ? url
                : `${this.config.baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

        Logger.info(`Navigating to: ${targetUrl}`);

        try {

            await this.page.goto(targetUrl);

            Logger.debug(`Navigation completed: ${targetUrl}`);

        } catch (error) {

            Logger.error(
                `Failed to navigate to: ${targetUrl}`
            );

            throw new FrameworkError(
                `Failed to navigate to: ${targetUrl}`,
                { cause: error }
            );
        }
    }

    /**
     * Returns the current page title.
     */
    async getTitle(): Promise<string> {

        return await this.page.title();
    }
}