
import { test } from "@fixtures/framework.fixture";

test("Verify Example home page", async ({ homePage }) => {

    await homePage.open();

    await homePage.verifyTitle();

});
