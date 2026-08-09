import { test as base } from "@playwright/test";

import { DriverManager } from "@core/driver/DriverManager";

import { HomePage } from "@pages/HomePage";
import { LoginPage } from "@pages/LoginPage";


type FrameworkFixtures = {

    homePage: HomePage;

    loginPage: LoginPage;

};


export const test = base.extend<FrameworkFixtures>({

    homePage: async ({}, use) => {

        await DriverManager.initialize();

        await DriverManager.createPage();

        const page =
            DriverManager.getPage();

        const homePage =
            new HomePage(page);

        await use(homePage);

        await DriverManager.close();

    },


    loginPage: async ({}, use) => {

        await DriverManager.initialize();

        await DriverManager.createPage();

        const page =
            DriverManager.getPage();

        const loginPage =
            new LoginPage(page);

        await use(loginPage);

        await DriverManager.close();

    }

});


export { expect } from "@playwright/test";
