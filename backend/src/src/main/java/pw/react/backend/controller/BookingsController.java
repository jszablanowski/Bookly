package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.requests.BookingResponse;
import pw.react.backend.services.BookingService;
import pw.react.backend.services.SecurityService;
import pw.react.backend.services.UserService;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/bookings")
public class BookingsController {
    private final Logger logger = LoggerFactory.getLogger(BookingsController.class);

    private final BookingService bookingService;
    private final UserService userService;
    private final SecurityService securityService;

    @Autowired
    public BookingsController(BookingService bookingService, UserService userService, SecurityService securityService)
    {
        this.bookingService = bookingService;
        this.userService = userService;
        this.securityService = securityService;
    }

    @GetMapping(path = "")
    public ResponseEntity<ArrayList<BookingResponse>> getUserBookings(@RequestHeader HttpHeaders headers) {
        if (securityService.isAuthorized(headers)) {
            var user = securityService.getUserFromHeaders(headers);
            var bookings = bookingService.getUserBookings(user.getId());
            return ResponseEntity.ok(bookings);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ArrayList<BookingResponse>());
    }

    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<BookingResponse> getBooking(@RequestHeader HttpHeaders headers,
                                                      @PathVariable long bookingId)
    {
        if (securityService.isAuthorized(headers)) {
            var booking = bookingService.getBooking(bookingId);
            return ResponseEntity.ok(booking);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new BookingResponse());
    }

    @DeleteMapping(path = "/{bookingId}")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers,
                                                      @PathVariable long bookingId)
    {
        if (securityService.isAuthorized(headers)) {
            var result = bookingService.deleteBooking(bookingId);
            var response = result == true ? ResponseEntity.ok("Booking deleted")
                    : ResponseEntity.ok("Error when deleting booking");
            // tu powinnismy jeszcze jakis badRequest jak nie ma bookingu zwracac ale tego nie ma w spec.
            return response;
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid security token");
    }
}