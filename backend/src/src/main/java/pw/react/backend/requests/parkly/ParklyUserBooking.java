package pw.react.backend.requests.parkly;

import pw.react.backend.items.ParkingItem;
import pw.react.backend.models.User;

import java.util.Date;

public class ParklyUserBooking {
    public ParkingItem item;
    public Date startDate;
    public boolean active;
    public int bookingId;
    public User user;
}
