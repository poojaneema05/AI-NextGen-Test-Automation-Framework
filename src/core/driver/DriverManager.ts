import { Browser, BrowserContext, Page } from "@playwright/test";
import { FrameworkContext } from "@core/context/FrameworkContext";
import { BrowserFactory } from "@core/browser/BrowserFactory";
import { Logger } from "@logger/Logger";
import { FrameworkError } from "@common/errors/FrameworkError";

/**
 * Manages the Playwright browser lifecycle for the framework.
 *
 * Responsibilities:
 * - Initializes and stores the browser instance.
 * - Creates browser contexts and pages.
 * - Provides access to the current browser resources.
 * - Closes browser resources after test execution.
 *
 * DriverManager delegates the actual browser creation to BrowserFactory
 * and stores runtime objects through FrameworkContext.
 */
export class DriverManager {

    /**
 * Initializes the browser through BrowserFactory and stores it
 * in FrameworkContext for use by the current test.
 */
static async initialize(): Promise<void> {

    Logger.info("Initializing browser through BrowserFactory");

    try {

        const browser = await BrowserFactory.createBrowser();

        FrameworkContext.setBrowser(browser);

        Logger.debug("Browser instance stored in FrameworkContext");

    } catch (error) {

        Logger.error("Failed to initialize browser");

        throw new FrameworkError(
            "Failed to initialize browser.",
            { cause: error }
        );
    }
}

    /**
     * Sets the browser instance.
     */
    static setBrowser(browser: Browser): void {

        FrameworkContext.setBrowser(browser);
    }

    /**
 * Creates a new browser context and page.
 *
 * A separate context is created for each test fixture to keep
 * browser state isolated between tests.
 */
static async createPage(): Promise<Page> {

    try {

        const browser = FrameworkContext.getBrowser();

        const context = await browser.newContext();

        FrameworkContext.setContext(context);

        const page = await context.newPage();

        FrameworkContext.setPage(page);

        Logger.debug("Created new browser context and page");

        return page;

    } catch (error) {

        Logger.error(
            "Failed to create browser context or page"
        );

        throw new FrameworkError(
            "Failed to create browser context or page.",
            { cause: error }
        );
    }
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
 *
 * This releases Playwright resources after test execution.
 */
static async close(): Promise<void> {

    Logger.debug("Closing browser context and browser");

    try {

        const context = FrameworkContext.getContext();
        const browser = FrameworkContext.getBrowser();

        await context.close();
        await browser.close();

        Logger.debug(
            "Browser context and browser closed successfully"
        );

    } catch (error) {

        Logger.error(
            "Failed to close browser context or browser"
        );

        throw new FrameworkError(
            "Failed to close browser context or browser.",
            { cause: error }
        );
    }
}
}