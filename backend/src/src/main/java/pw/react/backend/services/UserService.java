package pw.react.backend.services;

import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.User;

import java.util.Optional;

public interface UserService {
    User getUserByLogin(String login) throws ResourceNotFoundException;
    boolean userAuthorized(User user, String password);
}
