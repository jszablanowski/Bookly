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
import pw.react.backend.models.Booking;
import pw.react.backend.requests.BaseBooking;
import pw.react.backend.requests.BaseBookingResponse;
import pw.react.backend.requests.BaseUserBooking;
import pw.react.backend.requests.BaseUserBookingsResponse;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.min;
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
    public BaseBookingResponse getUserBookings(long userId, Integer page, Integer size, SortType sort,
            FilteringType filter, ItemType itemType) {

        var response = new BaseBookingResponse() {
            {
                items = new ArrayList<BaseBooking>();
            }
        };
        var userBookings = repository.findBookingsByUserId(userId);
        userBookings.removeIf(x -> x.getItemType() != itemType);

        var filteredBookings = filterBookings(userBookings, filter, sort);

        var pagedBookings = pageBookings(filteredBookings, page.intValue(), size.intValue());

        for (var bookingEntry : pagedBookings) {
            var bookingItem = itemService.getItem(bookingEntry.getItemId(), bookingEntry.getItemType());

            response.items.add(new BaseBooking() {
                {
                    active = bookingEntry.isActive();
                    startDate = bookingEntry.getStartDateTime();
                    item = bookingItem;
                    bookingId = (int) bookingEntry.getId();
                }
            });
        }

        response.page = page;
        response.totalPages = (int)(Math.ceil((double)filteredBookings.size() / (double)size));
        return response;
    }

    @Override
    public BaseBooking getBooking(long bookingId) throws ResourceNotFoundException {
        var bookingEntry = repository.findById(bookingId);

        if (!bookingEntry.isPresent())
            throw new ResourceNotFoundException("Booking not found");

        var itemBase = itemService.getItem(bookingEntry.get().getItemId(), bookingEntry.get().getItemType());
        var booking = bookingEntry.get();
        return new BaseBooking() {
            {
                active = booking.isActive();
                startDate = booking.getStartDateTime();
                item = itemBase;
            }
        };
    }

    @Override
    public BaseUserBookingsResponse getAllBookings(Integer page, Integer size, SortType sort, FilteringType filter,
                                                   ItemType itemType) {
        var response = new BaseUserBookingsResponse() {
            {
                items = new ArrayList<BaseUserBooking>();
            }
        };
        var allBookings = repository.findBookingsByItemType(itemType);
        var filteredBookings = filterBookings(allBookings, filter, sort);

        var pagedBookings = pageBookings(filteredBookings, page, size);

        for (var bookingEntry : pagedBookings) {
            var bookingItem = itemService.getItem(bookingEntry.getItemId(), bookingEntry.getItemType());
            var bookingUser = bookingEntry.getUser();

            response.items.add(new BaseUserBooking() {
                {
                    active = bookingEntry.isActive();
                    startDate = bookingEntry.getStartDateTime();
                    item = bookingItem;
                    user = bookingUser;
                }
            });
        }

        response.page = page;
        response.totalPages = (int)(Math.ceil((double)filteredBookings.size() / (double)size));
        return response;
    }

    @Override
    public boolean deleteBooking(long bookingId) throws ResourceNotFoundException {
        try {
            var booking = repository.findById(bookingId);
            if (!booking.isPresent())
                return false;
            var result = itemService.releaseItem(parseInt(booking.get().getItemId()), booking.get().getItemType(),
                    booking.get().getExternalBookingId());
            if (result == true) {
                booking.get().setActive(false);
                repository.save(booking.get());
            }
            else
                return false;
        } catch (Exception e) {
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

        if (updateBookingDto.itemType != null) {
            var itemTypeEnum = ItemType.valueOf(updateBookingDto.itemType);
            booking.setItemType(itemTypeEnum);
        }

        if (updateBookingDto.itemId != null) {
            booking.setItemId(updateBookingDto.itemId);
        }

        if (updateBookingDto.startDateTime != null) {
            booking.setStartDateTime(updateBookingDto.startDateTime);
        }

        booking.setActive(updateBookingDto.active);
        repository.save(booking);
        return booking;
    }

    private int compareDates(Date date1, Date date2, SortType sortType) {
        if (sortType == SortType.asc) {
            if (date1.before(date2))
                return 1;
            return 0;
        }

        if (date2.before(date1))
            return 1;
        return 0;

    }

    private ArrayList<Booking> filterBookings(ArrayList<Booking> bookings, FilteringType filter, SortType sort) {
        if (filter != null) {
            if (filter == FilteringType.active)
                bookings.removeIf(x -> x.isActive() != true);
            else if (filter == FilteringType.inactive)
                bookings.removeIf(x -> x.isActive() == true);
        }

        if (sort != null) {
            bookings.sort((x, y) -> compareDates(x.getStartDateTime(), y.getStartDateTime(), sort));
        }

        return bookings;
    }

    private ArrayList<Booking> pageBookings(ArrayList<Booking> bookings, int page, int pageSize) {
        var fromIdx = (page - 1) * pageSize;
        var toIdx = min(fromIdx  + pageSize, bookings.size());
        return new ArrayList<Booking>(bookings.subList(fromIdx, toIdx));
    }
}