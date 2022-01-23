package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.dto.AddBookingDto;
import pw.react.backend.enums.ItemType;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Booking;
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
        for (var bookingEntry: userBookings)
        {
            var bookingItem = itemService.getItem(bookingEntry.getItemId(), bookingEntry.getItemType());

            responseList.add( new BookingResponse()
            {{
                booking = bookingEntry;
                item = bookingItem;
            }});
        }
        return responseList;
    }

    @Override
    public BookingResponse getBooking(long bookingId) throws ResourceNotFoundException {
        var bookingEntry = repository.findById(bookingId);

        if (!bookingEntry.isPresent())
            throw new ResourceNotFoundException("Booking not found");

        var itemBase = itemService.getItem(bookingEntry.get().getItemId(), bookingEntry.get().getItemType());
        return new BookingResponse(){{
            booking =  bookingEntry.get();
            item = itemBase;
        }};
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

    @Override
    public void addBooking(Booking booking) {
        repository.save(booking);
    }
}