import { test } from "@fixtures/framework.fixture";
import { loginData } from "@tests/data/login.data";

test("Verify successful login", async ({ loginPage }) => {

    await loginPage.open();

    await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
    );

    await loginPage.verifySuccessfulLogin();

});
