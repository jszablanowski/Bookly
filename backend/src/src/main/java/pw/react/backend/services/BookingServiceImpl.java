package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.dto.AddBookingDto;
import pw.react.backend.dto.UpdateBookingDto;
import pw.react.backend.enums.FilteringType;
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
    public ArrayList<BookingResponse> getUserBookings(long userId, Integer page, Integer size, SortType sort,
                                                      FilteringType filter) {

        var responseList = new ArrayList<BookingResponse>();
        ArrayList<Booking> userBookings;
        Sort sortMode = null;
        if (sort == SortType.desc)
            sortMode = Sort.by("startDateTime").descending();
        else if (sort == SortType.asc)
            sortMode = Sort.by("startDateTime").ascending();

        if (page != null || sort != null)
        {
            if(size == null)
                size = 10; //default page size

            if (page != null)
            {
                Pageable pageable;

                if(sort != null)
                {
                    pageable = PageRequest.of(page, size, sortMode);
                }
                else
                {
                    pageable = PageRequest.of(page, size);
                }
                userBookings = repository.findBookingsByUserId(userId, pageable);
            }
            else
            {
                if (sort != null) {
                    userBookings = repository.findBookingsByUserId(userId, sortMode);
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

        if(filter == FilteringType.active) {
            userBookings.removeIf(s -> s.isActive() == false);
        }
        else if(filter == FilteringType.inactive){
            userBookings.removeIf(s -> s.isActive() == true);

        }

        for (var bookingEntry: userBookings)
        {
            var bookingItem = itemService.getItem(bookingEntry.getItemId(), bookingEntry.getItemType());

            responseList.add( new BookingResponse()
            {{
                active = bookingEntry.isActive();
                startDate = bookingEntry.getStartDateTime();
                itemType = bookingEntry.getItemType();
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
        var booking = bookingEntry.get();
        return new BookingResponse(){{
            active = booking.isActive();
            startDate = booking.getStartDateTime();
            itemType = booking.getItemType();
            item = itemBase;
        }};
    }

    @Override
    public ArrayList<BookingResponse> getAllBookings(Integer page, Integer size, SortType sort, FilteringType filter)
    {
        var responseList = new ArrayList<BookingResponse>();
        ArrayList<Booking> userBookings;
        Sort sortMode = null;
        if (sort == SortType.desc)
            sortMode = Sort.by("startDateTime").descending();
        else if (sort == SortType.asc)
            sortMode = Sort.by("startDateTime").ascending();

        if (page != null || sort != null)
        {
            if(size == null)
                size = 10; //default page size

            if (page != null)
            {
                Pageable pageable;

                if(sort != null)
                {
                    pageable = PageRequest.of(page, size, sortMode);
                }
                else
                {
                    pageable = PageRequest.of(page, size);
                }
                userBookings = repository.findAll(pageable);
            }
            else
            {
                if (sort != null) {
                    userBookings = repository.findAll(sortMode);
                }
                else
                {
                    userBookings = repository.findAll();
                }
            }
        }
        else // without pagination
        {
            userBookings = repository.findAll();
        }

        if(filter == FilteringType.active) {
            userBookings.removeIf(s -> s.isActive() == false);
        }
        else if(filter == FilteringType.inactive){
            userBookings.removeIf(s -> s.isActive() == true);

        }

        for (var bookingEntry: userBookings)
        {
            var bookingItem = itemService.getItem(bookingEntry.getItemId(), bookingEntry.getItemType());

            responseList.add( new BookingResponse()
            {{
                active = bookingEntry.isActive();
                startDate = bookingEntry.getStartDateTime();
                itemType = bookingEntry.getItemType();
                item = bookingItem;
            }});
        }
        return responseList;
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
    public Booking updateBooking(UpdateBookingDto updateBookingDto, long bookingId) throws ResourceNotFoundException {
        var bookingEntry = repository.findById(bookingId);

        if (!bookingEntry.isPresent())
            throw new ResourceNotFoundException("Booking not found");

        var booking = bookingEntry.get();

        if(updateBookingDto.itemType != null)
        {
            var itemTypeEnum = ItemType.valueOf(updateBookingDto.itemType);
            booking.setItemType(itemTypeEnum);
        }

        if(updateBookingDto.itemId != null)
        {
            booking.setItemId(updateBookingDto.itemId);
        }

        if(updateBookingDto.startDateTime != null)
        {
            booking.setStartDateTime(updateBookingDto.startDateTime);
        }

        booking.setActive(updateBookingDto.active);
        repository.save(booking);
        return booking;
    }
}