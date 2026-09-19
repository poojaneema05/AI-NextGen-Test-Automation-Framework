import { test, expect } from "@fixtures/api.fixture";
import { ApiAssertions } from "@core/api/ApiAssertions";
import { BookingTestData } from "@common/testdata/api/BookingTestData";


test("Delete an existing booking", async ({ bookingService }) => {

    const bookingRequest =
        BookingTestData.validBooking();


    const createResponse =
        await bookingService.createBooking(
            bookingRequest
        );


    const bookingId =
        createResponse.body.bookingid;


    expect(bookingId).toBeTruthy();


    const deleteResponse =
        await bookingService.deleteBooking(
            bookingId
        );


    await ApiAssertions.expectStatus(
    deleteResponse,
    201
    );


    const getResponse =
        await bookingService.getBooking(
            bookingId
        );


    await ApiAssertions.expectStatus(
    getResponse,
    404
    );
});