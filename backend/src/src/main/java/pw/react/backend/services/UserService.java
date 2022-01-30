package pw.react.backend.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import pw.react.backend.dto.UpdateUserDto;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.User;

import java.util.Optional;

public interface UserService {
    User validateAndSave(User user);
    User updatePassword(User user, String password);
    void setPasswordEncoder(PasswordEncoder passwordEncoder);
    User getByUserName(String userName);
    void disableUser(long userId) throws ResourceNotFoundException;
    User updateUser(long userId, UpdateUserDto updateUserDto) throws ResourceNotFoundException;
}
