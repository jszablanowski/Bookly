package pw.react.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dto.UpdateUserDto;
import pw.react.backend.models.User;
import pw.react.backend.services.UserService;

@RestController
@RequestMapping(path = "/users")
@Profile({"jwt"})
public class UsersController {
    private UserService userService;

    @Autowired
    public UsersController(UserService userService){
        this.userService = userService;
    }

    @DeleteMapping(path = "/{userId}")
    public ResponseEntity<String> disableUser(@PathVariable long userId)
    {
        userService.disableUser(userId);
        return ResponseEntity.ok("User has been disabled");
    }

    @PutMapping(path = "/userId")
    public ResponseEntity<User> updateUser(@PathVariable long userId, UpdateUserDto updateUserDto)
    {
        var user = userService.updateUser(userId, updateUserDto);
        return ResponseEntity.ok(user);
    }
}
