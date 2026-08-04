import { test } from "@playwright/test";
import { DriverManager } from "@core/driver/DriverManager";
import { LoginPage } from "@pages/LoginPage";
import { TestDataManager } from "@common/testdata/TestDataManager";
import { LoginData } from "@common/testdata/LoginData";

test.describe("Login Tests", () => {

    test.beforeEach(async () => {

        await DriverManager.initialize();

        await DriverManager.createPage();

    });

    test.afterEach(async () => {

        await DriverManager.close();

    });

    test("valid login", async () => {

    const page = DriverManager.getPage();

    const loginPage = new LoginPage(page);

    const loginData =
        TestDataManager.getData<LoginData>("loginData");

    await loginPage.open();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await loginPage.verifySuccessfulLogin();

});

});