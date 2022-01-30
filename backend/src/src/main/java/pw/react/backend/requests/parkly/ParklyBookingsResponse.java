package pw.react.backend.requests.parkly;

import pw.react.backend.items.ParkingItem;

import java.util.List;

public class ParklyBookingsResponse {
    public List<ParklyBooking> items;
    public int page;
    public int totalPages;
}


