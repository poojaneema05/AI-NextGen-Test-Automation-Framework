import { Browser, BrowserContext, Page } from "@playwright/test";

import { FrameworkContext } from "@core/context/FrameworkContext";
import { BrowserFactory } from "@core/browser/BrowserFactory";

export class DriverManager {

    /**
     * Initializes the browser.
     */
    static async initialize(): Promise<void> {

        const browser = await BrowserFactory.createBrowser();

        FrameworkContext.setBrowser(browser);
    }

    /**
     * Sets the browser instance.
     */
    static setBrowser(browser: Browser): void {

        FrameworkContext.setBrowser(browser);
    }

    /**
     * Creates a new browser context and page.
     */
    static async createPage(): Promise<Page> {

        const browser = FrameworkContext.getBrowser();

        const context = await browser.newContext();

        FrameworkContext.setContext(context);

        const page = await context.newPage();

        FrameworkContext.setPage(page);

        return page;
    }

    /**
     * Returns the current browser instance.
     */
    static getBrowser(): Browser {

        return FrameworkContext.getBrowser();
    }

    /**
     * Returns the current browser context.
     */
    static getContext(): BrowserContext {

        return FrameworkContext.getContext();
    }

    /**
     * Returns the current page.
     */
    static getPage(): Page {

        return FrameworkContext.getPage();
    }

    /**
     * Closes the browser context and browser.
     */
    static async close(): Promise<void> {

        const context = FrameworkContext.getContext();
        const browser = FrameworkContext.getBrowser();

        await context.close();
        await browser.close();
    }
}