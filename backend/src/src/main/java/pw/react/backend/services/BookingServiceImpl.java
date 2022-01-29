package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.dto.AddBookingDto;
import pw.react.backend.enums.ItemType;
import pw.react.backend.enums.SortType;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.externalApi.ExternalApiHandlerResolver;
import pw.react.backend.models.Booking;
import pw.react.backend.requests.BookingResponse;

import java.util.ArrayList;
import static java.lang.Integer.parseInt;

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
    public ArrayList<BookingResponse> getUserBookings(long userId, Integer page, Integer size, SortType sort) {

        var responseList = new ArrayList<BookingResponse>();
        ArrayList<Booking> userBookings;

        if (page != null || sort != null)
        {
            if(size == null)
                size = 10; //default page size

            if (page != null)
            {
                Pageable pageable;

                if(sort != null)
                {
                    if (sort == SortType.DESCENDING) {
                        pageable = PageRequest.of(page, size, Sort.by("startDateTime").descending());
                    }
                    else if(sort == SortType.ASCENDING)
                    {
                        pageable = PageRequest.of(page, size, Sort.by("startDateTime"));
                    }
                    else
                    {
                        pageable = PageRequest.of(page, size);
                    }
                }
                else
                {
                    pageable = PageRequest.of(page, size);
                }
                userBookings = repository.findBookingsByUserId(userId, pageable);
            }
            else
            {
                if (sort == SortType.DESCENDING) {
                    userBookings = repository.findBookingsByUserId(userId, Sort.by("startDateTime").descending());
                }
                else if(sort == SortType.ASCENDING)
                {
                    userBookings = repository.findBookingsByUserId(userId, Sort.by("startDateTime"));
                }
                else
                {
                    userBookings = repository.findBookingsByUserId(userId);
                }
            }
        }
        else // without pagination
        {
            userBookings = repository.findBookingsByUserId(userId);
        }

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
            var booking = repository.findById(bookingId);
            if (!booking.isPresent())
                return false;
            var result = itemService.releaseItem(parseInt(booking.get().getItemId()), booking.get().getItemType(),
                    booking.get().getExternalBookingId());
            if (result == true)
                repository.deleteById(bookingId);
            else return false;
        }
        catch(Exception e)
        {
            return false;
        }
        return true;
    }

    @Override
    public void addBooking(Booking booking) {
        var result = itemService.bookItem(booking.getUser(), booking.getStartDateTime(), parseInt(booking.getItemId()),
                booking.getItemType());
        if (result != -1) {
            booking.setExternalBookingId(result);
            repository.save(booking);
        }
    }

    @Override
    public void updateBooking(Booking booking)  {
        repository.save(booking);
    }
}