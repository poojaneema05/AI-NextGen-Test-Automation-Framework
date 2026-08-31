import { test } from "@fixtures/framework.fixture";

import { TestDataManager } from "@common/testdata/TestDataManager";
import { LoginData } from "@common/testdata/LoginData";


test.describe("Login Validation", () => {

    test(
        "valid login",
        async ({ loginPage }) => {

            const loginData =
                TestDataManager.getData<LoginData>("loginData");


            await loginPage.open();


            await loginPage.login(
                loginData.validUser.username,
                loginData.validUser.password
            );


            await loginPage.verifySuccessfulLogin();

        }
    );

});