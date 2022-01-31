import {
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
    pageSize: number,
    dateSort?: string,
    location?: string,
    model?: string,
    priceSort?: string,
    text?: string
  ) => Promise<CarItemsResponse>;

  getParkingItems: (
    token: string,
    page: number,
    pageSize: number,
    active?: boolean
  ) => Promise<ParkingItemsResponse>;

  getFlatItems: (
    token: string,
    pageNumber: number,
    city?: string,
    sorted?: boolean,
    street?: string,
    text?: string
  ) => Promise<FlatItemsResponse>;
}

export class ItemsService implements IItemsService {
  getCarItems(
    token: string,
    page: number,
    pageSize: number,
    dateSort?: string,
    location?: string,
    model?: string,
    priceSort?: string,
    text?: string
  ): Promise<CarItemsResponse> {
    let client = new ItemsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getCarItemsUsingGET(
      page,
      pageSize,
      dateSort,
      location,
      model,
      priceSort,
      text
    );
  }

  getFlatItems(
    token: string,
    pageNumber: number,
    city?: string,
    sorted?: boolean,
    street?: string,
    text?: string
  ): Promise<FlatItemsResponse> {
    let client = new ItemsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getFlatItemsUsingGET(pageNumber, city, sorted, street, text);
  }

  getParkingItems(
    token: string,
    page: number,
    pageSize: number,
    active?: boolean
  ): Promise<ParkingItemsResponse> {
    let client = new ItemsControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getParkingItemsUsingGET(page, pageSize, active);
  }
}
