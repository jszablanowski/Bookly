package pw.react.backend.requests;

import pw.react.backend.enums.ItemType;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.Booking;

import java.util.Date;

public class BookingResponse{
    public ItemBase item;
    public Date startDate;
    public boolean active;
    public ItemType itemType;
}

