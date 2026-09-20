package soa.dto;

public class AuthResponse {

    private String token;
    private String role;
    private String name;
    private String message;

    public AuthResponse(
            String token,
            String role,
            String name,
            String message) {

        this.token = token;
        this.role = role;
        this.name = name;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }
}