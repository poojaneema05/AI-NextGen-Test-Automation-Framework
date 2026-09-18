import { test as base } from "@playwright/test";

import { ApiClient } from "@core/api/ApiClient";
import { BookingService } from "@core/api/services/BookingService";


/**
 * Defines the API fixtures available to API tests.
 *
 * Responsibilities:
 * - Create the ApiClient before each test
 * - Create API service classes
 * - Provide services directly to tests
 * - Close the ApiClient after each test
 */
type ApiFixtures = {

    apiClient: ApiClient;

    bookingService: BookingService;
};


export const test = base.extend<ApiFixtures>({

    apiClient: async ({}, use) => {

        const apiClient =
            await ApiClient.create();

        try {

            await use(apiClient);

        } finally {

            await apiClient.close();
        }
    },


    bookingService: async (
        { apiClient },
        use
    ) => {

        const bookingService =
            new BookingService(apiClient);

        await use(bookingService);
    }
});


export { expect } from "@playwright/test";