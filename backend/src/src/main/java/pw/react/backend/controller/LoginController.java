package pw.react.backend.controller;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.exceptions.UnauthorizedException;
import pw.react.backend.models.Company;
import pw.react.backend.models.User;
import pw.react.backend.services.CompanyService;
import pw.react.backend.services.UserService;
import pw.react.backend.utils.HttpLoggingUtils;
import pw.react.backend.web.login.LoginRequest;
import pw.react.backend.web.login.LoginResponse;

import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "/login")
public class LoginController {
    private final Logger logger = LoggerFactory.getLogger(CompanyController.class);

    private final UserService userService;

    LoginController(UserService userService){
        this.userService = userService;
    }

    @PostMapping(path = "")
    public ResponseEntity<LoginResponse> loginUser(@RequestHeader HttpHeaders headers,
                                                   @RequestBody LoginRequest loginRequest) {
        HttpLoggingUtils.logHeaders(headers, logger);

        User user;
        try{
            user = userService.getUserByLogin(loginRequest.getLogin());
        }
        catch (ResourceNotFoundException e){
            throw new UnauthorizedException("Bad login and password");
        }

        if (!userService.userAuthorized(user, loginRequest.getPassword())){
            throw new UnauthorizedException("Bad login and password");
        }

        return ResponseEntity.ok(new LoginResponse(user.getSecurityToken()));
    }
}
