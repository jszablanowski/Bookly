package pw.react.backend.requests;

import pw.react.backend.items.ItemBase;
import pw.react.backend.models.User;

import java.util.Date;

public class BaseUserBooking {
    public ItemBase item;
    public Date startDate;
    public boolean active;
    public int bookingId;
    public User user;
}
