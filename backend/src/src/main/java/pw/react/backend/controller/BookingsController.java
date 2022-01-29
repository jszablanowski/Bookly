package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dto.AddBookingDto;
import pw.react.backend.dto.UpdateBookingDto;
import pw.react.backend.enums.FilteringType;
import pw.react.backend.enums.ItemType;
import pw.react.backend.enums.SortType;
import pw.react.backend.models.Booking;
import pw.react.backend.dto.AddBookingDto;
import pw.react.backend.requests.BookingResponse;
import pw.react.backend.services.BookingService;
import pw.react.backend.services.UserService;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/bookings")
@Profile({"jwt"})
public class BookingsController {
    private final Logger logger = LoggerFactory.getLogger(BookingsController.class);

    private final BookingService bookingService;
    private final UserService userService;

    @Autowired
    public BookingsController(BookingService bookingService, UserService userService)
    {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @GetMapping(path = "")
    public ResponseEntity<ArrayList<BookingResponse>> getUserBookings(@RequestParam(required = false) Integer page,
                                                                      @RequestParam(required = false) Integer size,
                                                                      @RequestParam(required = false) SortType sort,
                                                                      @RequestParam(required = false) FilteringType filter) {

        var userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userService.getByUserName(userName);
        var bookings = bookingService.getUserBookings(user.getId(), page, size, sort, filter);
        return ResponseEntity.ok(bookings);
    }
    @PutMapping(path = "/{bookingId}")
    public ResponseEntity<Booking> updateBooking(@RequestBody UpdateBookingDto updateBookingDto, @PathVariable long bookingId)
    {
        var booking = bookingService.updateBooking(updateBookingDto, bookingId);
        return ResponseEntity.ok(booking);
    }

    @PostMapping(path = "")
    public ResponseEntity<Booking> addBooking(@RequestBody AddBookingDto addBookingDto)
    {
        var userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userService.getByUserName(userName);
        var itemTypeEnum = ItemType.valueOf(addBookingDto.itemType);
        var newBooking = Booking.Create(user, addBookingDto.startDateTime, addBookingDto.itemId,
                itemTypeEnum);

        bookingService.addBooking(newBooking);
        return ResponseEntity.ok(newBooking);
    }


    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<BookingResponse> getBooking(@PathVariable long bookingId)
    {
        var booking = bookingService.getBooking(bookingId);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping(path = "/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable long bookingId)
    {
        var result = bookingService.deleteBooking(bookingId);
        return result ? ResponseEntity.ok("Booking deleted")
                : ResponseEntity.ok("Error when deleting booking");
        // tu powinnismy jeszcze jakis badRequest jak nie ma bookingu zwracac ale tego nie ma w spec.
    }
}