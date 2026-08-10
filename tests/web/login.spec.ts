import { test } from "@fixtures/framework.fixture";
test("Verify successful login", async ({ loginPage }) => {

    await loginPage.open();

    await loginPage.login(
        "student",
        "Password123"
    );

    await loginPage.verifySuccessfulLogin();

});
