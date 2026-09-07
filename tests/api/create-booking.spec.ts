import { test, expect } from "@playwright/test";

import { ApiClient } from "@core/api/ApiClient";
import { BookingService } from "@core/api/services/BookingService";
import { CreateBookingRequest } from "@core/api/models/CreateBookingRequest";
import { CreateBookingResponse } from "@core/api/models/CreateBookingResponse";


test("Create a new booking", async () => {

    const apiClient =
        await ApiClient.create();

    const bookingService =
        new BookingService(apiClient);

    const bookingRequest: CreateBookingRequest = {

        firstname: "John",

        lastname: "Doe",

        totalprice: 150,

        depositpaid: true,

        bookingdates: {
            checkin: "2026-09-10",
            checkout: "2026-09-15"
        },

        additionalneeds: "Breakfast"
    };

    try {

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

    } finally {

        await apiClient.close();

    }
});