import { test, expect } from "@fixtures/api.fixture";

import { CreateBookingResponse } from "@core/api/models/CreateBookingResponse";
import { BookingTestData } from "@common/testdata/api/BookingTestData";


test("Create a new booking", async ({ bookingService }) => {

    const bookingRequest =
        BookingTestData.validBooking();


    const response =
        await bookingService.createBooking(
            bookingRequest
        );


    const body: CreateBookingResponse =
        response;


    expect(body).toHaveProperty("bookingid");

    expect(body).toHaveProperty("booking");


    expect(body.booking.firstname)
        .toBe(bookingRequest.firstname);


    expect(body.booking.lastname)
        .toBe(bookingRequest.lastname);
});