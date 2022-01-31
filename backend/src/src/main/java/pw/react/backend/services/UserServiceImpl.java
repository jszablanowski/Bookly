package pw.react.backend.services;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.CompanyRepository;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.dto.UpdateUserDto;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.exceptions.UserValidationException;
import pw.react.backend.models.Booking;
import pw.react.backend.models.User;
import pw.react.backend.requests.user.UsersResponse;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.lang.Integer.min;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Setter
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    @Override
    public User validateAndSave(User user) {
        if (isValidUser(user)) {
            log.info("User is valid");
            Optional<User> dbUser = userRepository.findByUsername(user.getUsername());
            if (dbUser.isPresent()) {
                log.info("User already exists. Updating it.");
                user.setId(dbUser.get().getId());
                user.setActive(true);
            }
            user = userRepository.save(user);
            log.info("User was saved.");
        }
        return user;
    }

    private boolean isValidUser(User user) {
        if (user != null) {
            if (!isValid(user.getUsername())) {
                log.error("Empty username.");
                throw new UserValidationException("Empty username.");
            }
            if (!isValid(user.getPassword())) {
                log.error("Empty user password.");
                throw new UserValidationException("Empty user password.");
            }
            if (!isValid(user.getEmail())) {
                log.error("UEmpty email.");
                throw new UserValidationException("Empty email.");
            }
            return true;
        }
        log.error("User is null.");
        throw new UserValidationException("User is null.");
    }

    private boolean isValid(String value) {
        return value != null && !value.isBlank();
    }

    @Override
    public User updatePassword(User user, String password) {
        if (isValidUser(user)) {
            if (passwordEncoder != null) {
                log.debug("Encoding password.");
                user.setPassword(passwordEncoder.encode(password));
            } else {
                log.debug("Password in plain text.");
                user.setPassword(password);
            }
            user = userRepository.save(user);
        }
        return user;
    }

    @Override
    public User getByUserName(String userName) {
        return userRepository.findByUsername(userName)
                .orElseThrow(() -> new ResourceNotFoundException("User with userName: " + userName + " not found."));
    }

    @Override
    public void disableUser(long userId) throws ResourceNotFoundException{
        var userEntry = userRepository.findById(userId);

        if (!userEntry.isPresent())
            throw new ResourceNotFoundException("User not found");

        var user = userEntry.get();

        user.setActive(false);

        userRepository.save(user);

    }

    @Override
    public User updateUser(long userId, UpdateUserDto updateUserDto) throws ResourceNotFoundException {
        var userEntry = userRepository.findById(userId);

        if (!userEntry.isPresent())
            throw new ResourceNotFoundException("User not found");

        var user = userEntry.get();

        if (updateUserDto.username != null)
            user.setUsername(updateUserDto.username);

        if (updateUserDto.email != null)
            user.setEmail(updateUserDto.email);

        if (updateUserDto.firstName != null)
            user.setFirstName(updateUserDto.firstName);

        if (updateUserDto.lastName != null)
            user.setLastName(updateUserDto.lastName);

        if (updateUserDto.password != null)
        {
            var password = passwordEncoder.encode(updateUserDto.password);
            user.setPassword(password);
        }

        userRepository.save(user);
        return user;
    }

    public UsersResponse getUsers(int pageNo, int size, Boolean active)
    {
        var usersDb = userRepository.findAll();

        if (active != null)
        {
            usersDb.removeIf(x -> x.isActive() != active);
        }
        usersDb.removeIf(x -> x.isAdmin());

        var fromIdx = (pageNo - 1) * size;
        var toIdx = min(fromIdx + size, usersDb.size());
        var pages = (int)(Math.ceil((double)usersDb.size() / (double)size));
        return new UsersResponse(){{
            users = usersDb.subList(fromIdx, toIdx);
            page = pageNo;
            totalPages = pages;
        }};
    }


    @Override
    public boolean hasAdminPermissions(User user)
    {
        if (user.isAdmin())
            return true;
        else return false;
    }
}
