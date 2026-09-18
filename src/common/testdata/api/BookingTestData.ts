import { CreateBookingRequest } from "@core/api/models/CreateBookingRequest";
import { UpdateBookingRequest } from "@core/api/models/UpdateBookingRequest";

/**
 * Provides reusable test data for Booking API tests.
 *
 * Keeping test data separate from test cases makes
 * API tests easier to maintain and reuse.
 */
export class BookingTestData {


    /**
     * Returns a standard valid booking request.
     */
    static validBooking(): CreateBookingRequest {

        return {

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
    }
        /**
     * Returns updated booking data.
     */
    static updatedBooking(): UpdateBookingRequest {

        return {

            firstname: "Jane",

            lastname: "Smith",

            totalprice: 250,

            depositpaid: false,

            bookingdates: {
                checkin: "2026-09-20",
                checkout: "2026-09-25"
            },

            additionalneeds: "Lunch"
        };
    }
}