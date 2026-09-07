import { Given, Then } from "@cucumber/cucumber";

import { CustomWorld } from "@cucumber/world/CustomWorld";


Given(
    "I am on the homepage",
    async function (this: CustomWorld) {

        await this.homePage.open();

    }
);


Then(
    "I should see the correct homepage title",
    async function (this: CustomWorld) {

        await this.homePage.verifyTitle();
        
    }
);