import { test, expect } from "@fixtures/api.fixture";
import { ApiAssertions } from "@core/api/ApiAssertions";
import { CreateBookingResponse } from "@core/api/models/CreateBookingResponse";
import { BookingTestData } from "@common/testdata/api/BookingTestData";


test("Create a new booking", async ({ bookingService }) => {

    const bookingRequest =
        BookingTestData.validBooking();


    const result =
    await bookingService.createBooking(
        bookingRequest
    );

    await ApiAssertions.expectStatus(
    result.response,
    200
    );

    const body: CreateBookingResponse =
    result.body;


    expect(body).toHaveProperty("bookingid");

    expect(body).toHaveProperty("booking");


    expect(body.booking.firstname)
        .toBe(bookingRequest.firstname);


    expect(body.booking.lastname)
        .toBe(bookingRequest.lastname);
});