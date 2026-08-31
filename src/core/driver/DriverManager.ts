import {
    Browser,
    BrowserContext,
    Page
} from "@playwright/test";

import { FrameworkContext } from "@core/context/FrameworkContext";

import { BrowserFactory } from "@core/browser/BrowserFactory";

import { Logger } from "@logger/Logger";

import { FrameworkError } from "@common/errors/FrameworkError";


/**
 * Manages the Playwright browser lifecycle for a test.
 *
 * Responsibilities:
 * - Initializes the browser.
 * - Creates browser contexts and pages.
 * - Provides access to browser resources.
 * - Closes browser resources after test execution.
 *
 * Each DriverManager instance owns its own FrameworkContext,
 * providing isolation between test executions.
 */
export class DriverManager {

    private readonly frameworkContext:
        FrameworkContext;


    constructor() {

        this.frameworkContext =
            new FrameworkContext();
    }


    /**
     * Initializes the browser through BrowserFactory.
     */
    async initialize(): Promise<void> {

        Logger.info(
            "Initializing browser through BrowserFactory"
        );


        try {

            const browser =
                await BrowserFactory.createBrowser();


            this.frameworkContext.setBrowser(
                browser
            );


            Logger.debug(
                "Browser instance stored in FrameworkContext"
            );

        } catch (error) {

            Logger.error(
                "Failed to initialize browser"
            );


            throw new FrameworkError(
                "Failed to initialize browser.",
                { cause: error }
            );
        }
    }


    /**
     * Creates a browser context and page.
     */
    async createPage(): Promise<Page> {

        try {

            const browser =
                this.frameworkContext.getBrowser();


            const context =
                await browser.newContext();


            this.frameworkContext.setContext(
                context
            );


            const page =
                await context.newPage();


            this.frameworkContext.setPage(
                page
            );


            Logger.debug(
                "Created new browser context and page"
            );


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
     * Returns the current browser.
     */
    getBrowser(): Browser {

        return this.frameworkContext.getBrowser();
    }


    /**
     * Returns the current browser context.
     */
    getContext(): BrowserContext {

        return this.frameworkContext.getContext();
    }


    /**
     * Returns the current page.
     */
    getPage(): Page {

        return this.frameworkContext.getPage();
    }


    /**
     * Closes browser resources and clears framework state.
     */
    async close(): Promise<void> {

        Logger.debug(
            "Closing browser context and browser"
        );


        try {

            const context =
                this.frameworkContext.getContext();


            const browser =
                this.frameworkContext.getBrowser();


            await context.close();

            await browser.close();


            this.frameworkContext.clear();


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