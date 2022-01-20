package pw.react.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pw.react.backend.models.User;
import pw.react.backend.services.UserService;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping(path = "/users")
@Profile({"jwt"})
@Slf4j
public class JwtUserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public JwtUserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    private void init() {
        userService.setPasswordEncoder(passwordEncoder);
    }

    @PostMapping(path = "")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user = userService.validateAndSave(user);
        log.info("Password is going to be encoded.");
        userService.updatePassword(user, user.getPassword());
        return ResponseEntity.ok(user);
    }
}
