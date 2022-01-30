package pw.react.backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import pw.react.backend.enums.ItemType;
import pw.react.backend.models.Booking;

import java.util.ArrayList;
import java.util.Optional;

public interface BookingRepository extends PagingAndSortingRepository<Booking, Long> {
    Optional<Booking> findById(long id);
    ArrayList<Booking> findBookingsByUserId(long userId);
    ArrayList<Booking> findBookingsByUserId(long userId, Pageable pageable);
    ArrayList<Booking> findBookingsByUserId(long userId, Sort pageable);
    ArrayList<Booking> findBookingsByItemType(ItemType itemType);
    Page<Booking> findAll(Pageable pageable);
    ArrayList<Booking> findAll();

}