package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.requests.BookingResponse;

import java.util.ArrayList;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository repository;
    private final ItemService itemService;

    @Autowired
    BookingServiceImpl(BookingRepository repository, ItemService itemService) {
        this.repository = repository;
        this.itemService = itemService;
    }


    @Override
    public ArrayList<BookingResponse> getUserBookings(long userId){

        var responseList = new ArrayList<BookingResponse>();
        var userBookings = repository.findBookingsByUserId((userId));
        for (var booking: userBookings)
        {
            var response = new BookingResponse();
            response.booking = booking;
            response.item = itemService.getItem(booking.getItemId(), booking.getItemType());
        }
        return responseList;
    }

    @Override
    public BookingResponse getBooking(long bookingId) throws ResourceNotFoundException {
        var booking = repository.findById(bookingId);

        if (!booking.isPresent())
            throw new ResourceNotFoundException("Booking not found");

        var response = new BookingResponse();
        response.booking = booking.get();
        response.item = itemService.getItem(booking.get().getItemId(), booking.get().getItemType());
        return response;
    }

    @Override
    public boolean deleteBooking(long bookingId) throws ResourceNotFoundException {
        try
        {
            repository.deleteById(bookingId);
        }
        catch(Exception e)
        {
            return false;
        }
        return true;
    }
}