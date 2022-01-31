package pw.react.backend.requests.user;

import pw.react.backend.models.User;

import java.util.List;

public class UsersResponse {
    public List<User> users;
    public int page;
    public int totalPages;
}
