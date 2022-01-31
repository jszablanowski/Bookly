package pw.react.backend.requests;

import java.util.List;

public class BaseUserBookingsResponse {
    public List<BaseUserBooking> items;
    public int page;
    public int totalPages;
}
