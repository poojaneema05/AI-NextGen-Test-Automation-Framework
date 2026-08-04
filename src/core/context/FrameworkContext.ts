import { Browser, BrowserContext, Page } from "@playwright/test";

export class FrameworkContext {

    private static browser?: Browser;
    private static context?: BrowserContext;
    private static page?: Page;

    static setBrowser(browser: Browser): void {
        this.browser = browser;
    }

    static getBrowser(): Browser {

        if (!this.browser) {
            throw new Error(
                "Browser has not been initialized"
            );
        }

        return this.browser;
    }


    static setContext(context: BrowserContext): void {
        this.context = context;
    }

    static getContext(): BrowserContext {

        if (!this.context) {
            throw new Error(
                "BrowserContext has not been initialized"
            );
        }

        return this.context;
    }

    static setPage(page: Page): void {
        this.page = page;
    }

   static getPage(): Page {

        if (!this.page) {
            throw new Error(
                "Page has not been initialized"
            );
        }

        return this.page;
    }

}