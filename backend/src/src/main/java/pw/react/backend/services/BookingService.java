package pw.react.backend.services;

import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.requests.BookingResponse;

import java.util.ArrayList;

public interface BookingService {
    ArrayList<BookingResponse> getUserBookings(long userId) throws ResourceNotFoundException;
    BookingResponse getBooking(long bookingId) throws ResourceNotFoundException;
    boolean deleteBooking(long bookingId) throws ResourceNotFoundException;
}