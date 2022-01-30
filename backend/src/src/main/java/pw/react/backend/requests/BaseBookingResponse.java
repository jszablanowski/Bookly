package pw.react.backend.requests;

import pw.react.backend.enums.ItemType;
import pw.react.backend.items.ItemBase;
import pw.react.backend.models.Booking;

import java.util.Date;
import java.util.List;

public class BaseBookingResponse{
    public List<BaseBooking> items;
    public int page;
    public int totalPages;
}

