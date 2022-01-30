package pw.react.backend.requests.flatly;

import pw.react.backend.items.FlatItem;

import java.util.List;

public class FlatlyBookingsResponse {
    public List<FlatlyBooking> items;
    public int page;
    public int totalPages;
}

