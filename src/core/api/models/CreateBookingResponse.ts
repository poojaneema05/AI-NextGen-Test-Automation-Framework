export interface CreateBookingResponse {

    bookingid: number;

    booking: {
        firstname: string;
        lastname: string;
        totalprice: number;
        depositpaid: boolean;

        bookingdates: {
            checkin: string;
            checkout: string;
        };

        additionalneeds?: string;
    };
}