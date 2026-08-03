import { Browser, BrowserContext, Page } from "@playwright/test";


export class DriverManager {


private static browser: Browser;
private static context: BrowserContext;
private static page: Page;


static setBrowser(browser:Browser){

    this.browser = browser;

}


static async createPage(){

    this.context =
        await this.browser.newContext();


    this.page =
        await this.context.newPage();


    return this.page;

}



static getPage(){

    return this.page;

}



static async close(){

    await this.context.close();
    await this.browser.close();

}


}