package com.CH22_Project.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.CH22_Project.JwtUtil.JwtUtil;
import com.CH22_Project.models.User;
import com.CH22_Project.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	@Override
	public ResponseEntity<User> insertUser(User user) {
		user.setUserpassword(encoder.encode(user.getUserpassword()));
		User savedUser = userRepository.save(user);
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}

	@Override
	public String verify(User user) {
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("USER "+user.getUserusername(), user.getUserpassword()));
			if(authentication.isAuthenticated()) {
				Map<String, Object> claims = new HashMap<>();
				claims.put("role", "USER");
				String token = jwtUtil.generateToken(user.getUserusername(), claims);
				User user2 = userRepository.findByUserusername(user.getUserusername());
				tokenService.saveUserToken(token, user2);
				return token;
			}
		}catch (Exception e) {
			throw new RuntimeException("Invalid username or password!!");
		}
		return "fail";
	}

	@Override
	public void deleteUser(String username) {
		try {
			User user = userRepository.findByUserusername(username);
			if(user!=null) {
				userRepository.delete(user);
			}
		}catch (Exception e) {
			throw new UsernameNotFoundException("Record not found to delete");
		}
	}

	@Override
	public User updateProfile(String username, User updatedUser) {
		User user = userRepository.findByUserusername(username);
		user.setFname(updatedUser.getFname());
		user.setLname(updatedUser.getLname());
		user.setUseremail(updatedUser.getUseremail());
		user.setUserphone(updatedUser.getUserphone());
		return userRepository.save(user);
	}

	@Override
	public User getProfile(String username) {
		User user = userRepository.findByUserusername(username);
		return user;
	}

}
