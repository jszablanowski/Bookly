package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<ArrayList<BookingResponse>> getUserBookings(Authentication authentication) {
        var user = userService.getByUserName(authentication.getName());
        var bookings = bookingService.getUserBookings(user.getId());
        return ResponseEntity.ok(bookings);
    }


    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<BookingResponse> getBooking(@RequestHeader HttpHeaders headers,
                                                      @PathVariable long bookingId)
    {
        var booking = bookingService.getBooking(bookingId);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping(path = "/{bookingId}")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers,
                                                      @PathVariable long bookingId)
    {
        var result = bookingService.deleteBooking(bookingId);
        var response = result == true ? ResponseEntity.ok("Booking deleted")
                : ResponseEntity.ok("Error when deleting booking");
        // tu powinnismy jeszcze jakis badRequest jak nie ma bookingu zwracac ale tego nie ma w spec.
        return response;
    }
}