package soa.service;

import org.springframework.stereotype.Service;

import soa.dto.LoginRequest;
import soa.entity.User;
import soa.repository.UserRepository;

@Service
public class UserService {
	UserRepository repository;

	public UserService(UserRepository repository) {
		this.repository = repository;
	}
	
	public Object registerUser(User user) {
		if(repository.existsByEmail(user.getEmail())) {
			throw new RuntimeException("Email already exists!!");
		}
		repository.save(user);
		return "User Registered Successfully";
		
	}
	
	public Object loginUser(LoginRequest loginrequest) {
		User u = repository.findByEmail(loginrequest.getEmail())
				.orElseThrow(()-> new RuntimeException("Email Doesn't Exits!"));
		if(!u.getPassword().equals(loginrequest.getPassword())) {
			throw new RuntimeException("Invalid Password!");
		}
		return u;
	}
	

}
