package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dto.AddBookingDto;
import pw.react.backend.dto.UpdateBookingDto;
import pw.react.backend.enums.FilteringType;
import pw.react.backend.enums.ItemType;
import pw.react.backend.enums.SortType;
import pw.react.backend.models.Booking;
import pw.react.backend.requests.BaseBooking;
import pw.react.backend.requests.carly.CarlyBooking;
import pw.react.backend.requests.carly.CarlyBookingsResponse;
import pw.react.backend.requests.carly.CarlyUserBooking;
import pw.react.backend.requests.carly.CarlyUserBookingsResponse;
import pw.react.backend.requests.flatly.FlatlyBooking;
import pw.react.backend.requests.flatly.FlatlyBookingsResponse;
import pw.react.backend.requests.flatly.FlatlyUserBooking;
import pw.react.backend.requests.flatly.FlatlyUserBookingsResponse;
import pw.react.backend.requests.parkly.ParklyBooking;
import pw.react.backend.requests.parkly.ParklyBookingsResponse;
import pw.react.backend.requests.parkly.ParklyUserBooking;
import pw.react.backend.requests.parkly.ParklyUserBookingsResponse;
import pw.react.backend.services.BookingService;
import pw.react.backend.services.UserService;

import java.util.List;

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

    @GetMapping(path = "user/flats")
    public ResponseEntity<FlatlyBookingsResponse> getUserFlats(@RequestParam Integer page,
                                                                @RequestParam Integer size,
                                                                @RequestParam(required = false) SortType sort,
                                                                @RequestParam(required = false) FilteringType filter) {

        var userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userService.getByUserName(userName);
        var bookings = bookingService.getUserBookings(user.getId(), page, size, sort, filter, ItemType.ROOM);
        var response = new FlatlyBookingsResponse(){{
            items = (List<FlatlyBooking>)(Object)bookings.items;
            page = bookings.page;
            totalPages = bookings.totalPages;
        }};
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "user/cars")
    public ResponseEntity<CarlyBookingsResponse> getUserCars(@RequestParam Integer page,
                                                                @RequestParam Integer size,
                                                                @RequestParam(required = false) SortType sort,
                                                                @RequestParam(required = false) FilteringType filter) {

        var userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userService.getByUserName(userName);
        var bookings = bookingService.getUserBookings(user.getId(), page, size, sort, filter, ItemType.CAR);
        var response = new CarlyBookingsResponse(){{
            items = (List<CarlyBooking>)(Object)bookings.items;
            page = bookings.page;
            totalPages = bookings.totalPages;
        }};
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "user/parkings")
    public ResponseEntity<ParklyBookingsResponse> getUserParkings(@RequestParam Integer page,
                                                                @RequestParam Integer size,
                                                                @RequestParam(required = false) SortType sort,
                                                                @RequestParam(required = false) FilteringType filter) {

        var userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userService.getByUserName(userName);
        var bookings = bookingService.getUserBookings(user.getId(), page, size, sort, filter, ItemType.PARKING);
        var response = new ParklyBookingsResponse(){{
            items = (List<ParklyBooking>)(Object)bookings.items;
            page = bookings.page;
            totalPages = bookings.totalPages;
        }};
        return ResponseEntity.ok(response);
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
    public ResponseEntity<BaseBooking> getBooking(@PathVariable long bookingId)
    {
        var booking = bookingService.getBooking(bookingId);
        return ResponseEntity.ok(booking);
    }

    @GetMapping(path = "/all/flats")
    public ResponseEntity<FlatlyUserBookingsResponse> getFlatsBookings(@RequestParam Integer page,
                                                                       @RequestParam Integer size,
                                                                       @RequestParam(required = false) SortType sort,
                                                                       @RequestParam(required = false) FilteringType filter)
    {
        var bookings = bookingService.getAllBookings(page, size, sort, filter, ItemType.ROOM);
        var response = new FlatlyUserBookingsResponse(){{
            items = (List<FlatlyUserBooking>)(Object)bookings.items;
            page = bookings.page;
            totalPages = bookings.totalPages;
        }};
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/all/cars")
    public ResponseEntity<CarlyUserBookingsResponse> getCarsBookings(@RequestParam Integer page,
                                                                     @RequestParam Integer size,
                                                                     @RequestParam(required = false) SortType sort,
                                                                     @RequestParam(required = false) FilteringType filter)
    {
        var bookings = bookingService.getAllBookings(page, size, sort, filter, ItemType.CAR);
        var response = new CarlyUserBookingsResponse(){{
            items = (List<CarlyUserBooking>)(Object)bookings.items;
            page = bookings.page;
            totalPages = bookings.totalPages;
        }};
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/all/parkings")
    public ResponseEntity<ParklyUserBookingsResponse> getParkingsBookings(@RequestParam Integer page,
                                                                          @RequestParam Integer size,
                                                                          @RequestParam(required = false) SortType sort,
                                                                          @RequestParam(required = false) FilteringType filter)
    {
        var bookings = bookingService.getAllBookings(page, size, sort, filter, ItemType.PARKING);
        var response = new ParklyUserBookingsResponse(){{
            items = (List<ParklyUserBooking>)(Object)bookings.items;
            page = bookings.page;
            totalPages = bookings.totalPages;
        }};
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(path = "/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable long bookingId)
    {
        var result = bookingService.deleteBooking(bookingId);
        return result ? ResponseEntity.ok("Booking deleted")
                : ResponseEntity.ok("Error when deleting booking");
    }
}