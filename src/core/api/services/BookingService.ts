import { CreateBookingRequest } from "@core/api/models/CreateBookingRequest";
import { CreateBookingResponse } from "@core/api/models/CreateBookingResponse";
import { APIResponse } from "@playwright/test";
import { ApiClient } from "@core/api/ApiClient";


/**
 * Provides business-level operations for the Booking service.
 *
 * BookingService is responsible for:
 * - Booking-specific API endpoints
 * - Business-level API operations
 *
 * HTTP mechanics remain inside ApiClient.
 */
export class BookingService {

    constructor(
        private readonly apiClient: ApiClient
    ) {}


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

//Creates a new booking.

async createBooking(
    request: CreateBookingRequest
): Promise<CreateBookingResponse> {

    const response =
        await this.apiClient.post(
            "/booking",
            request
        );

    return await response.json() as CreateBookingResponse;
}
}