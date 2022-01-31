import { 
  CarlyBookingsResponse,
  ParklyBookingsResponse,
  FlatlyBookingsResponse,
  BookingsControllerApi 
} from "../api";
import { BASE_URL } from "../apiConfig";

export interface IBookingsService {
  getCarlyBookings: (
    token: string,
    page: number,
    size: number,
    sort?: string,
    fliter?: string
  ) => Promise<CarlyBookingsResponse>;

  getParklyBookings: (
    token: string,
    page: number,
    size: number,
    sort?: string,
    fliter?: string
  ) => Promise<ParklyBookingsResponse>;

  getFlatlyBookings: (
    token: string,
    page: number,
    size: number,
    sort?: string,
    fliter?: string
  ) => Promise<FlatlyBookingsResponse>;
}

export class BookingService implements IBookingsService {
  getCarlyBookings(
    token: string,
    page: number,
    size: number,
    sort?: string,
    fliter?: string
  ): Promise<CarlyBookingsResponse> {
    let client = new BookingsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
  });

    return client.getCarsBookingsUsingGET(
      page,
      size,
      fliter,
      sort
    );
  }

  getParklyBookings(
    token: string,
    page: number,
    size: number,
    sort?: string,
    fliter?: string
  ): Promise<ParklyBookingsResponse> {
    let client = new BookingsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
  });

    return client.getParkingsBookingsUsingGET(
      page,
      size,
      fliter,
      sort
    );
  }

  getFlatlyBookings(
    token: string,
    page: number,
    size: number,
    sort?: string,
    fliter?: string
  ): Promise<FlatlyBookingsResponse> {
    let client = new BookingsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
  });

    return client.getFlatsBookingsUsingGET(
      page,
      size,
      fliter,
      sort
    );
  }
}
