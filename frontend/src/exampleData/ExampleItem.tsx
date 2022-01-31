import { CarItem } from "../classes/CarItem";
import { ParkingItem } from "../classes/ParkingItem";
import { BookingItem } from '../classes/BookingItem';
import carFromJSON from "./car.json"
import parkingFromJSON from "./parking.json"
import bookingFromJSON from "./booking.json"
import flatFromJSON from "./flat.json"
import { FlatItem } from "../classes/FlatItem";

export const exampleCar: CarItem = carFromJSON;
export const exampleParking: ParkingItem = parkingFromJSON;
export const exampleBooking: BookingItem = bookingFromJSON;
export const exampleFlat: FlatItem = flatFromJSON;