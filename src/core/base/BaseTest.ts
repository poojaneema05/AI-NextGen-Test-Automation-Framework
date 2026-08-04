import { BrowserFactory } from "@core/browser/BrowserFactory";
import { DriverManager } from "@core/driver/DriverManager";


export class BaseTest{


static async setup(): Promise<void>{

    const browser =
        await BrowserFactory.createBrowser();


    DriverManager.setBrowser(browser);


    await DriverManager.createPage();

}



static async teardown(){

    await DriverManager.close();

}


}