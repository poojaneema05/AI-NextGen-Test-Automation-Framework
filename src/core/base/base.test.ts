import { BrowserFactory } from "../browser/browser.factory";
import { DriverManager } from "../driver/driver.manager";


export class BaseTest{


static async setup(){

    const browser =
        await BrowserFactory.createBrowser();


    DriverManager.setBrowser(browser);


    await DriverManager.createPage();

}



static async teardown(){

    await DriverManager.close();

}


}