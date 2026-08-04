import { Browser, BrowserContext, Page } from "@playwright/test";
import { FrameworkContext } from "@core/context/FrameworkContext";
import { BrowserFactory } from "@core/browser/BrowserFactory";

export class DriverManager {

    static setBrowser(browser: Browser): void {
        FrameworkContext.setBrowser(browser);
    }

    static async createPage(): Promise<Page> {

        const browser = FrameworkContext.getBrowser();

        const context = await browser.newContext();

        FrameworkContext.setContext(context);

        const page = await context.newPage();

        FrameworkContext.setPage(page);

        return page;
    }

    static getBrowser(): Browser {
        return FrameworkContext.getBrowser();
    }

    static getContext(): BrowserContext {
        return FrameworkContext.getContext();
    }

    static getPage(): Page {
        return FrameworkContext.getPage();
    }

    static async close(): Promise<void> {

        await FrameworkContext.getContext().close();

        await FrameworkContext.getBrowser().close();

    }
    static async initialize(): Promise<void> {

    const browser =
        await BrowserFactory.createBrowser();

    FrameworkContext.setBrowser(browser);

}
}