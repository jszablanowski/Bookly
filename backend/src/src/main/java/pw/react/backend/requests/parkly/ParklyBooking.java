package pw.react.backend.requests.parkly;

import pw.react.backend.items.ParkingItem;

import java.util.Date;

public class ParklyBooking {
    public ParkingItem item;
    public Date startDate;
    public boolean active;
    public int bookingId;
}
