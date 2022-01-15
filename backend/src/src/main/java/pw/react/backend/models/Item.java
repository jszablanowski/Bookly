package pw.react.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "item")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", length = 128)
    private String name;

    @Column(name = "startDateTime")
    private Date startDateTime;

    @Column(name = "endDateTime")
    private Date endDateTime;

    @Column(name = "active")
    private boolean active;

    // Other...
}
