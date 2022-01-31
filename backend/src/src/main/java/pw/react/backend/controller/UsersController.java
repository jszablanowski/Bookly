package pw.react.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
        var userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userService.getByUserName(userName);
        if (!userService.hasAdminPermissions(user))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User has no admin permissions");
        userService.disableUser(userId);
        return ResponseEntity.ok("User has been disabled");
    }

    @PutMapping(path = "/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable long userId, @RequestBody UpdateUserDto updateUserDto)
    {
        var userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userService.getByUserName(userName);
        if (!userService.hasAdminPermissions(user))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        var updatedUser = userService.updateUser(userId, updateUserDto);
        return ResponseEntity.ok(updatedUser);
    }
}
