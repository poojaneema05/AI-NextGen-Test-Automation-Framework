import { test, expect } from "@playwright/test";
import { DriverManager } from "@core/driver/DriverManager";
import { HomePage } from "@pages/HomePage";


test.describe("Homepage Validation", () => {


    test.beforeEach(async () => {

        await DriverManager.initialize();

        await DriverManager.createPage();

    });


    test.afterEach(async () => {

        await DriverManager.close();

    });


    test("verify homepage", async () => {


       const page = DriverManager.getPage();

const homePage = new HomePage(page);

await homePage.open();

await homePage.verifyTitle();


    });


});