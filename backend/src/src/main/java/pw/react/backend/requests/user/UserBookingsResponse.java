package pw.react.backend.requests.user;

import pw.react.backend.requests.carly.CarlyBooking;
import pw.react.backend.requests.carly.CarlyBookingsResponse;
import pw.react.backend.requests.flatly.FlatlyBooking;
import pw.react.backend.requests.flatly.FlatlyBookingsResponse;
import pw.react.backend.requests.parkly.ParklyBookingsResponse;

import java.util.List;

public class UserBookingsResponse {
    public CarlyBookingsResponse cars;
    public FlatlyBookingsResponse flats;
    public ParklyBookingsResponse parkings;
}
