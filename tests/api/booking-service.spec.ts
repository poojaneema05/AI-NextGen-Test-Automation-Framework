import { test, expect } from "@fixtures/api.fixture";


test("Get booking by ID", async ({ bookingService }) => {

    const response =
        await bookingService.getBooking(1);

    expect(response.ok()).toBeTruthy();

    expect(response.status()).toBe(200);


    const body =
        await response.json();


    expect(body).toHaveProperty("firstname");

    expect(body).toHaveProperty("lastname");
});