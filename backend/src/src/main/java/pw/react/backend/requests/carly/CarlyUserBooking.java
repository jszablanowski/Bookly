package pw.react.backend.requests.carly;

import pw.react.backend.items.CarItem;
import pw.react.backend.models.User;

import java.util.Date;

public class CarlyUserBooking {
    public CarItem item;
    public Date startDate;
    public boolean active;
    public int bookingId;
    public User user;
}

