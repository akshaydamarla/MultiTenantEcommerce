package soa.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import soa.dto.AuthResponse;
import soa.dto.LoginRequest;
import soa.entity.User;
import soa.repository.UserRepository;
import soa.security.JWTService;

@Service
public class UserService {
	UserRepository repository;
	PasswordEncoder passwordEncoder;
	JWTService jwt;

	public UserService(UserRepository repository, PasswordEncoder passwordEncoder, JWTService jwt) {
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.jwt = jwt;
	}
	
	public Object registerUser(User user) {
		if(repository.existsByEmail(user.getEmail())) {
			throw new RuntimeException("Email already exists!!");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		repository.save(user);
		return "User Registered Successfully";
		
	}
	
	public Object loginUser(LoginRequest loginrequest) {
		User u = repository.findByEmail(loginrequest.getEmail())
				.orElseThrow(()-> new RuntimeException("Email Doesn't Exits!"));
		if(!passwordEncoder.matches(loginrequest.getPassword(),u.getPassword())) {
			throw new RuntimeException("Invalid Password!");
		}
		
		String token = jwt.generateToken(u.getEmail(), u.getRole());
		
		return new AuthResponse(token, u.getRole(), "Login Successfull!");
	}
	

}
