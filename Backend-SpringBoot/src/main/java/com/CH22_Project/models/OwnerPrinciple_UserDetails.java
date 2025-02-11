package com.CH22_Project.models;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class OwnerPrinciple_UserDetails implements UserDetails{
	
	private Owner owner;
	
	public OwnerPrinciple_UserDetails(Owner owner) {
		this.owner=owner;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singleton(new SimpleGrantedAuthority("OWNER"));
	}

	@Override
	public String getPassword() {
		return owner.getOwnerpassword();
	}

	@Override
	public String getUsername() {
		return owner.getOwnerusername();
	}

}
