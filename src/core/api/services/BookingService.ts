import { APIResponse } from "@playwright/test";
import { ApiResponse } from "@core/api/models/ApiResponse";
import { ApiBase } from "@core/api/ApiBase";
import { CreateBookingRequest } from "@core/api/models/CreateBookingRequest";
import { CreateBookingResponse } from "@core/api/models/CreateBookingResponse";
import { UpdateBookingRequest } from "@core/api/models/UpdateBookingRequest";
import { ApiClient } from "@core/api/ApiClient";


/**
 * Provides business-level operations for the Booking service.
 *
 * BookingService is responsible for:
 * - Booking-specific API endpoints
 * - Business-level API operations
 *
 * Common API functionality is provided by ApiBase.
 * HTTP mechanics remain inside ApiClient.
 */
export class BookingService extends ApiBase {


    constructor(apiClient: ApiClient) {

        super(apiClient);
    }


    /**
     * Retrieves a booking by ID.
     */
    async getBooking(
        bookingId: number
    ): Promise<APIResponse> {

        return await this.apiClient.get(
            `/booking/${bookingId}`
        );
    }


    /**
     * Creates a new booking.
     */
    async createBooking(
        request: CreateBookingRequest
    ): Promise<ApiResponse<CreateBookingResponse>> {

        const response =
            await this.apiClient.post(
                "/booking",
                request
            );

        return {
    response,
    body: await response.json() as CreateBookingResponse
};
    }

     /**
     * Updates an existing booking.
     */
    async updateBooking(
        bookingId: number,
        request: UpdateBookingRequest
    ): Promise<APIResponse> {

        return await this.apiClient.put(
            `/booking/${bookingId}`,
            request
        );
    }

    /**
     * Deletes an existing booking.
     */
    async deleteBooking(
        bookingId: number
    ): Promise<APIResponse> {

        return await this.apiClient.delete(
            `/booking/${bookingId}`
        );
    }
}