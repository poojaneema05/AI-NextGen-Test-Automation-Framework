import { Browser, BrowserContext, Page } from "@playwright/test";


export class FrameworkContext {

    private browser: Browser | undefined;

    private context: BrowserContext | undefined;

    private page: Page | undefined;


    setBrowser(browser: Browser): void {

        this.browser = browser;
    }


    getBrowser(): Browser {

        if (!this.browser) {

            throw new Error(
                "Browser has not been initialized"
            );
        }

        return this.browser;
    }


    setContext(context: BrowserContext): void {

        this.context = context;
    }


    getContext(): BrowserContext {

        if (!this.context) {

            throw new Error(
                "BrowserContext has not been initialized"
            );
        }

        return this.context;
    }


    setPage(page: Page): void {

        this.page = page;
    }


    getPage(): Page {

        if (!this.page) {

            throw new Error(
                "Page has not been initialized"
            );
        }

        return this.page;
    }


    clear(): void {

        this.browser = undefined;

        this.context = undefined;

        this.page = undefined;
    }
}