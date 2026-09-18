import { test, expect } from "@fixtures/api.fixture";

import { BookingTestData } from "@common/testdata/api/BookingTestData";


test("Delete an existing booking", async ({ bookingService }) => {

    const bookingRequest =
        BookingTestData.validBooking();


    const createResponse =
        await bookingService.createBooking(
            bookingRequest
        );


    const bookingId =
        createResponse.bookingid;


    expect(bookingId).toBeTruthy();


    const deleteResponse =
        await bookingService.deleteBooking(
            bookingId
        );


    expect(deleteResponse.status()).toBe(201);


    const getResponse =
        await bookingService.getBooking(
            bookingId
        );


    expect(getResponse.status()).toBe(404);
});