import { BookingResponse, BookingsControllerApi } from "../api";
import { BASE_URL } from "../apiConfig";

export interface IBookingsService {
  getUserBookings: (token: string) => Promise<BookingResponse[]>;
}

export class BookingService implements IBookingsService {
  getUserBookings(token: string) {
    let client = new BookingsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getUserBookingsUsingGET();
  }
}
