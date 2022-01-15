package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.CompanyRepository;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.User;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Autowired
    UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }


    @Override
    public User getUserByLogin(String login) {
        return repository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with login: " + login));
    }

    @Override
    public boolean userAuthorized(User user, String password){
        return user.getPassword().equals(password);
    }
}
