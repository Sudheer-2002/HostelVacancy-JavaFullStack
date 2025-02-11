package com.CH22_Project.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.CH22_Project.models.Owner;

@Service
public interface OwnerService {

	ResponseEntity<Owner> insertOwner(Owner owner,String city);

	String verify(Owner owner);

	Owner getProfile(String username);

	Owner updateProfile(String username, Owner updatedOwner);

	void deleteOwner(String username);

	String generateUsername(String city);
	
}
