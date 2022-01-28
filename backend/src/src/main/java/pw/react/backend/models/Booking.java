package pw.react.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import pw.react.backend.enums.ItemType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "booking")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "startDateTime")
    private Date startDateTime;

    @Column(name = "Active")
    private boolean active;

    @Column(name = "itemId")
    private String itemId;

    @Column(name = "externalBookingId")
    private int externalBookingId;

    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    public static Booking Create(User user, Date startDateTime, String itemId, ItemType itemType)
    {
        var booking = new Booking();
        booking.user = user;
        booking.startDateTime = startDateTime;
        booking.active = true;
        booking.itemId = itemId;
        booking.itemType = itemType;
        
        return booking;
    }
}
