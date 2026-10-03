import { test } from "@fixtures/api.fixture";

import { ApiAssertions } from "@core/api/ApiAssertions";


test("Get booking with an invalid booking ID", async ({ bookingService }) => {

    const response =
        await bookingService.getBooking(
            999999999
        );


    await ApiAssertions.expectErrorStatus(
        response,
        404
    );
});