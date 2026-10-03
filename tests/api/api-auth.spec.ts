import { test, expect } from "@playwright/test";

import { ApiAuth } from "@core/api/ApiAuth";
import { ApiAuthRequest } from "@core/api/models/ApiAuthRequest";


test("Authenticate with Restful Booker API", async () => {

    const credentials: ApiAuthRequest = {

        username: "admin",

        password: "password123"
    };


    const token =
        await ApiAuth.authenticate(
            credentials
        );


    expect(token).toBeTruthy();

    expect(typeof token).toBe("string");
});

test("Reject invalid API credentials", async () => {

    const invalidCredentials: ApiAuthRequest = {

        username: "invalid-user",

        password: "invalid-password"
    };


    await expect(
        ApiAuth.authenticate(
            invalidCredentials
        )
    ).rejects.rejects.toThrow();
});