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

    @OneToOne
    @JoinColumn(name = "itemId")
    private Item item;

    @Enumerated(EnumType.STRING)
    private ItemType itemType;
}
