import { test, expect } from "@fixtures/api.fixture";


test("Verify Restful Booker API is available", async ({ apiClient }) => {

    const response =
        await apiClient.get("/ping");

    expect(response.ok()).toBeTruthy();

    expect(response.status()).toBe(201);
});