import { test, expect } from "@fixtures/api.fixture";

import { BookingTestData } from "@common/testdata/api/BookingTestData";


test("Update an existing booking", async ({ bookingService }) => {

    const bookingId = 1;

    const updateRequest =
        BookingTestData.updatedBooking();


    const response =
        await bookingService.updateBooking(
            bookingId,
            updateRequest
        );


        console.log("STATUS:", response.status());
        console.log("BODY:", await response.text());

        expect(response.status()).toBe(200);


    const body =
        await response.json();


    expect(body).toHaveProperty("firstname");

    expect(body).toHaveProperty("lastname");


    expect(body.firstname)
        .toBe(updateRequest.firstname);


    expect(body.lastname)
        .toBe(updateRequest.lastname);


    expect(body.totalprice)
        .toBe(updateRequest.totalprice);


    expect(body.depositpaid)
        .toBe(updateRequest.depositpaid);
});