package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.Booking;

import java.util.ArrayList;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findById(long id);
    ArrayList<Booking> findBookingsByUserId(long userId);
}