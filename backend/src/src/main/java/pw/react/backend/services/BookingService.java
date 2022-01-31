package pw.react.backend.services;

import pw.react.backend.dto.UpdateBookingDto;
import pw.react.backend.enums.FilteringType;
import pw.react.backend.enums.ItemType;
import pw.react.backend.enums.SortType;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Booking;
import pw.react.backend.requests.BaseBooking;
import pw.react.backend.requests.BaseBookingResponse;
import pw.react.backend.requests.BaseUserBookingsResponse;


public interface BookingService {
    BaseBookingResponse getUserBookings(long userId, Integer page, Integer size, SortType sort, FilteringType filter, ItemType itemType)
            throws ResourceNotFoundException;
    BaseBooking getBooking(long bookingId) throws ResourceNotFoundException;
    BaseUserBookingsResponse getAllBookings(Integer page, Integer size, SortType sort, FilteringType filter, ItemType itemType);
    boolean deleteBooking(long bookingId) throws ResourceNotFoundException;
    void addBooking(Booking booking);
    Booking updateBooking(UpdateBookingDto updateBookingDto, long bookingId) throws ResourceNotFoundException;
}