import { test, expect } from "@fixtures/api.fixture";

import { BookingTestData } from "@common/testdata/api/BookingTestData";


test("Update an existing booking", async ({ bookingService }) => {

    const createRequest =
        BookingTestData.validBooking();


    const createResponse =
        await bookingService.createBooking(
            createRequest
        );


    const bookingId =
        createResponse.bookingid;


    expect(bookingId).toBeTruthy();


    const updateRequest =
        BookingTestData.updatedBooking();


    const updateResponse =
        await bookingService.updateBooking(
            bookingId,
            updateRequest
        );


    expect(updateResponse.status()).toBe(200);


    const updateBody =
        await updateResponse.json();


    expect(updateBody.firstname)
        .toBe(updateRequest.firstname);


    expect(updateBody.lastname)
        .toBe(updateRequest.lastname);


    expect(updateBody.totalprice)
        .toBe(updateRequest.totalprice);


    expect(updateBody.depositpaid)
        .toBe(updateRequest.depositpaid);


    const getResponse =
        await bookingService.getBooking(
            bookingId
        );


    expect(getResponse.status()).toBe(200);


    const getBody =
        await getResponse.json();


    expect(getBody.firstname)
        .toBe(updateRequest.firstname);


    expect(getBody.lastname)
        .toBe(updateRequest.lastname);


    expect(getBody.totalprice)
        .toBe(updateRequest.totalprice);


    expect(getBody.depositpaid)
        .toBe(updateRequest.depositpaid);
});