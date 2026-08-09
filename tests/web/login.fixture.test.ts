//import { test } from "@fixtures/framework.fixture";
import { test } from "../../src/fixtures/framework.fixture";

import { TestDataManager } from "@common/testdata/TestDataManager";
import { LoginData } from "@common/testdata/LoginData";

test("valid login using fixture", async ({ loginPage }) => {

    const loginData =
        TestDataManager.getData<LoginData>("loginData");

    await loginPage.open();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await loginPage.verifySuccessfulLogin();

});