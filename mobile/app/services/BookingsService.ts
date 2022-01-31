import {
  BookingsControllerApi,
  CarlyBookingsResponse,
  FlatlyBookingsResponse,
  ParklyBookingsResponse,
} from "../api";
import { BASE_URL } from "../apiConfig";

export interface IBookingsService {
  getUserFlatBookings: (
    token: string,
    page: number,
    pageSize: number,
    sortType: string,
    filteringType: string
  ) => Promise<CarlyBookingsResponse>;

  getUserCarBookings: (
    token: string,
    page: number,
    pageSize: number,
    sortType: string,
    filteringType: string
  ) => Promise<ParklyBookingsResponse>;

  getUserParkingBookings: (
    token: string,
    page: number,
    pageSize: number,
    sortType: string,
    filteringType: string
  ) => Promise<FlatlyBookingsResponse>;
}

export class BookingService implements IBookingsService {
  getUserFlatBookings(
    token: string,
    page: number,
    pageSize: number,
    sortType?: string,
    filteringType?: string
  ): Promise<CarlyBookingsResponse> {
    let client = new BookingsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getUserFlatsUsingGET(page, pageSize, filteringType, sortType);
  }

  getUserCarBookings(
    token: string,
    page: number,
    pageSize: number,
    sortType: string,
    filteringType: string
  ): Promise<ParklyBookingsResponse> {
    let client = new BookingsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getUserCarsUsingGET(page, pageSize, filteringType, sortType);
  }

  getUserParkingBookings(
    token: string,
    page: number,
    pageSize: number,
    sortType: string,
    filteringType: string
  ): Promise<FlatlyBookingsResponse> {
    let client = new BookingsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getUserParkingsUsingGET(
      page,
      pageSize,
      filteringType,
      sortType
    );
  }
}
