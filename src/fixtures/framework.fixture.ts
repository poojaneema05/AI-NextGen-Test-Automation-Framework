import { test as base } from "@playwright/test";

import { DriverManager } from "@core/driver/DriverManager";

import { HomePage } from "@pages/HomePage";
import { LoginPage } from "@pages/LoginPage";


type FrameworkFixtures = {

    driverManager: DriverManager;

    homePage: HomePage;

    loginPage: LoginPage;

};


export const test =
    base.extend<FrameworkFixtures>({

        driverManager: async ({}, use) => {

            const driverManager =
                new DriverManager();


            await driverManager.initialize();

            await driverManager.createPage();


            try {

                await use(driverManager);

            } finally {

                await driverManager.close();
            }
        },


        homePage: async ({ driverManager }, use) => {

            const page =
                driverManager.getPage();


            const homePage =
                new HomePage(page);


            await use(homePage);
        },


        loginPage: async ({ driverManager }, use) => {

            const page =
                driverManager.getPage();


            const loginPage =
                new LoginPage(page);


            await use(loginPage);
        }

    });


export { expect } from "@playwright/test";