import {
  BookingResponse,
  ItemsControllerApi,
  CarItemsResponse,
  FlatItemsResponse,
  ParkingItemsResponse,
} from "../api";
import { BASE_URL } from "../apiConfig";

export interface IItemsService {
  getCarItems: (
    token: string,
    page: number,
    pageSize: number
  ) => Promise<CarItemsResponse>;

  getParkingItems: (
    token: string,
    page: number,
    pageSize: number
  ) => Promise<ParkingItemsResponse>;

  getFlatItems: (
    token: string,
    pageNumber: number
  ) => Promise<FlatItemsResponse>;
}

export class ItemsService implements IItemsService {
  getCarItems(
    token: string,
    page: number,
    pageSize: number
  ): Promise<CarItemsResponse> {
    let client = new ItemsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getCarItemsUsingGET(page, pageSize);
  }

  getFlatItems(token: string, pageNumber: number): Promise<FlatItemsResponse> {
    let client = new ItemsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getFlatItemsUsingGET(pageNumber);
  }

  getParkingItems(
    token: string,
    page: number,
    pageSize: number
  ): Promise<ParkingItemsResponse> {
    let client = new ItemsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getParkingItemsUsingGET(page, pageSize);
  }
}
