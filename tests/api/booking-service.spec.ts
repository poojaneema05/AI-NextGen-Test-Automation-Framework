import { test, expect } from "@fixtures/api.fixture";
import { ApiAssertions } from "@core/api/ApiAssertions";
import { BookingTestData } from "@common/testdata/api/BookingTestData";


test("Get booking by ID", async ({ bookingService }) => {

    const bookingRequest =
        BookingTestData.validBooking();


    const createResponse =
        await bookingService.createBooking(
            bookingRequest
        );


    const bookingId =
        createResponse.body.bookingid;


    expect(bookingId).toBeTruthy();


    const response =
        await bookingService.getBooking(
            bookingId
        );


    await ApiAssertions.expectStatus(
    response,
    200
    );


    const body =
        await response.json();


    expect(body.firstname)
        .toBe(bookingRequest.firstname);


    expect(body.lastname)
        .toBe(bookingRequest.lastname);
});