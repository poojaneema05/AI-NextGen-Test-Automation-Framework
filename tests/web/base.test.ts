import { test } from "@fixtures/framework.fixture";


test.describe("Homepage Validation", () => {

    test(
        "verify homepage",
        async ({ homePage }) => {

            await homePage.open();

            await homePage.verifyTitle();

        }
    );

});