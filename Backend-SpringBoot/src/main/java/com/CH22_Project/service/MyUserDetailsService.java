package com.CH22_Project.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.CH22_Project.models.Owner;
import com.CH22_Project.models.OwnerPrinciple_UserDetails;
import com.CH22_Project.models.User;
import com.CH22_Project.models.UserPrinciple_UserDetails;
import com.CH22_Project.repository.OwnerRepository;
import com.CH22_Project.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService{
	
	@Autowired
	private OwnerRepository ownerRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	private UserDetails userDetails=null;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if(username.startsWith("OWNER ")) {
			Owner owner = ownerRepository.findByOwnerusername(username.substring(6));
			return new OwnerPrinciple_UserDetails(owner);
		}else if(username.startsWith("USER ")) {
			User user = userRepository.findByUserusername(username.substring(5));
			return new UserPrinciple_UserDetails(user);
		}
		return userDetails;
	}
}
