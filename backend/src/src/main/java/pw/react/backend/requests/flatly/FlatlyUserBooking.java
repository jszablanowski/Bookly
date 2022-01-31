package pw.react.backend.requests.flatly;

import pw.react.backend.items.FlatItem;
import pw.react.backend.models.User;

import java.util.Date;

public class FlatlyUserBooking {
    public FlatItem item;
    public Date startDate;
    public boolean active;
    public int bookingId;
    public User user;
}
