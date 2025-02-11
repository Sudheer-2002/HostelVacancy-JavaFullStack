package com.CH22_Project.service;

import org.springframework.stereotype.Service;

import com.CH22_Project.models.Owner;
import com.CH22_Project.models.User;

@Service
public interface TokenService {

	void saveOwnerToken(String token, Owner owner);
	
	void revokeToken(String ownerusername);

	void saveUserToken(String token, User user);

}
