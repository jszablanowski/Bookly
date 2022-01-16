package pw.react.backend.services;

import org.springframework.http.HttpHeaders;
import pw.react.backend.models.User;

public interface SecurityProvider {
    boolean isAuthenticated(HttpHeaders headers);
    boolean isAuthorized(HttpHeaders headers);
    User getUserFromHeaders(HttpHeaders headers);
}
