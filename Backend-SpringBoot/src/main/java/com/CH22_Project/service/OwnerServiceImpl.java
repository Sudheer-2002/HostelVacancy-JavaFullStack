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
import com.CH22_Project.models.Owner;
import com.CH22_Project.repository.OwnerRepository;

@Service
public class OwnerServiceImpl implements OwnerService {
	
	@Autowired
	private OwnerRepository ownerRepository;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private VacancyDetailsService vacancyDetailsService;
	
	@Autowired
	private TokenService tokenService;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	@Override
	public ResponseEntity<Owner> insertOwner(Owner owner,String city) {
		owner.setOwnerpassword(encoder.encode(owner.getOwnerpassword()));
	    owner.setOwnerusername(generateUsername(city));
		Owner savedOwner=ownerRepository.save(owner);
		vacancyDetailsService.insertVacancy(savedOwner,city);
		return new ResponseEntity<>(savedOwner,HttpStatus.CREATED);
	}

	@Override
	public String verify(Owner owner) {
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("OWNER "+owner.getOwnerusername(), owner.getOwnerpassword()));
			if(authentication.isAuthenticated()) {
			Map<String, Object> claims = new HashMap<>();
			claims.put("role", "OWNER");
			String token = jwtUtil.generateToken(owner.getOwnerusername(), claims);
			Owner owner2 = ownerRepository.findByOwnerusername(owner.getOwnerusername());
			tokenService.saveOwnerToken(token,owner2);
			return token;
		}
		}catch(Exception e) {
			throw new RuntimeException("Invalid username or password!!");
		}
		return "fail";
	}

	@Override
	public Owner getProfile(String username) {
		Owner owner = ownerRepository.findByOwnerusername(username);
		return owner;
	}

	@Override
	public Owner updateProfile(String username, Owner updatedOwner) {
		Owner owner = ownerRepository.findByOwnerusername(username);
		owner.setName(updatedOwner.getName());
		owner.setOwnerphone(updatedOwner.getOwnerphone());
		owner.setHostelname(updatedOwner.getHostelname());
		owner.setHosteladdress(updatedOwner.getHosteladdress());
		return ownerRepository.save(owner);
	}

	@Override
	public void deleteOwner(String username) {
		try {
			Owner owner = ownerRepository.findByOwnerusername(username);
			if(owner!=null) {
				ownerRepository.delete(owner);
			}
		}catch (Exception e) {
			throw new UsernameNotFoundException("Record not found to delete");
		}
		
	}

	@Override
	public String generateUsername(String city) {
		String cityCode = getCityCode(city);
		String maxOwnerusername = ownerRepository.findMaxOwnerusernameByPrefix(cityCode);
		int newNumber = 1;
		if(maxOwnerusername!=null) {
			String numberPart = maxOwnerusername.substring(3);
			newNumber=Integer.parseInt(numberPart)+1;
		}
		return String.format("%s%03d",cityCode,newNumber);
	}

	private String getCityCode(String city) {
		switch(city.toLowerCase()) {
		case "hyderabad":
			return "HYD";
		case "bangalore":
			return "BLR";
		case "chennai":
			return "CHN";
		case "vijayawada":
			return "VIJ";
		}
		return null;
	}

	
}
