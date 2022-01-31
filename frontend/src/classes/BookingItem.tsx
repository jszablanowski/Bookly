import { User } from "./User";
export interface BookingItem {
    item?: any,
    startDate: string,
    active: boolean,
    bookingId: number,
    user: User
}