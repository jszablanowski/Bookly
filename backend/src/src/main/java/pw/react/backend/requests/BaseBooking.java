package pw.react.backend.requests;

import pw.react.backend.items.ItemBase;

import java.util.Date;

public class BaseBooking {
    public ItemBase item;
    public Date startDate;
    public boolean active;
    public int bookingId;
}
