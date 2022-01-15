package pw.react.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;

@Service
class SecurityService implements SecurityProvider {

    private static final String SECURITY_HEADER = "security-header";
    private final UserRepository userRepository;

    @Autowired
    SecurityService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public boolean isAuthenticated(HttpHeaders headers) {
        if (headers == null) {
            return false;
        }

        if (headers.containsKey(SECURITY_HEADER)){
            var token = headers.getFirst(SECURITY_HEADER);
            var user = userRepository.findBySecurityToken(token);
            return user.isPresent();
        }

        return false;
    }

    @Override
    public boolean isAuthorized(HttpHeaders headers) {
        return isAuthenticated(headers);
    }
}
