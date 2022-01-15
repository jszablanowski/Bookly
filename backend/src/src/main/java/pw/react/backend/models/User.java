package pw.react.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import pw.react.backend.utils.JsonDateDeserializer;
import pw.react.backend.utils.JsonDateSerializer;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "login", length = 64)
    private String login;

    @Column(name = "password", length = 64)
    private String password;

    @Column(name = "firstName", length = 128)
    private String firstName;

    @Column(name = "lastName", length = 128)
    private String lastName;

    @Column(name = "securityToken", length = 128)
    private String securityToken;
}
