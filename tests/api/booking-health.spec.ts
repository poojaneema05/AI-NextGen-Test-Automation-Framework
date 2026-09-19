import { test, expect } from "@fixtures/api.fixture";
import { ApiAssertions } from "@core/api/ApiAssertions";


test("Verify Restful Booker API is available", async ({ apiClient }) => {

    const response =
        await apiClient.get("/ping");

    expect(response.ok()).toBeTruthy();

    await ApiAssertions.expectStatus(
    response,
    201
);
});