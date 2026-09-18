import { CreateBookingRequest } from "@core/api/models/CreateBookingRequest";


/**
 * Represents the request payload used to update
 * an existing booking.
 *
 * UpdateBookingRequest currently has the same structure
 * as CreateBookingRequest.
 */
export interface UpdateBookingRequest
    extends CreateBookingRequest {
}