package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.Company;
import pw.react.backend.models.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
