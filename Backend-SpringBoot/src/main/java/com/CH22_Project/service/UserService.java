package com.CH22_Project.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.CH22_Project.models.User;

@Service
public interface UserService {

	ResponseEntity<User> insertUser(User user);

	String verify(User user);

	void deleteUser(String username);

	User updateProfile(String username, User updatedUser);

	User getProfile(String username);

}
