import { Given, When, Then } from "@cucumber/cucumber";

import { CustomWorld } from "@cucumber/world/CustomWorld";

import { TestDataManager } from "@common/testdata/TestDataManager";
import { LoginData } from "@common/testdata/LoginData";


Given(
    "I am on the login page",
    async function (this: CustomWorld) {

        await this.loginPage.open();

    }
);


When(
    "I login with valid credentials",
    async function (this: CustomWorld) {

        const loginData =
            TestDataManager.getData<LoginData>("loginData");

        await this.loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

    }
);


Then(
    "I should see the successful login page",
    async function (this: CustomWorld) {

        await this.loginPage.verifySuccessfulLogin();

    }
);