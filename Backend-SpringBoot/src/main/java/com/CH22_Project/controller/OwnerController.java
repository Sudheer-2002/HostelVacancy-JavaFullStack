package com.CH22_Project.controller;


import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CH22_Project.models.Owner;
import com.CH22_Project.models.VacancyDetails;
import com.CH22_Project.payload.VacancyDetailsDto;
import com.CH22_Project.service.LogoutHandlerService;
import com.CH22_Project.service.LogoutSuccessHandlerService;
import com.CH22_Project.service.OwnerService;
import com.CH22_Project.service.VacancyDetailsService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnerController {
	
	@Autowired
	private OwnerService ownerService;
	
	@Autowired
	private VacancyDetailsService vacancyDetailsService;
	
	@Autowired
	private LogoutHandlerService logoutHandlerService;
	
	@Autowired
	private LogoutSuccessHandlerService logoutSuccessHandlerService;
		
	@PostMapping("/register")
	public ResponseEntity<Owner> insertOwner(@RequestBody Owner owner,@RequestParam(required = true) String city) {
		return ownerService.insertOwner(owner,city);
	}
	
	 @GetMapping("/generate-username")
	    public ResponseEntity<String> generateUsername(@RequestParam(required = true) String city) {
	        String username = ownerService.generateUsername(city);
	        return ResponseEntity.ok(username); 
	    }
	
	@PostMapping("/login")
	public ResponseEntity<String> findOwner(@RequestBody Owner owner){
		return new ResponseEntity<>(ownerService.verify(owner),HttpStatus.OK);
	}
	
	@GetMapping("/profile")
	public Owner getProfile(Authentication authentication) {
		String username = authentication.getName();
		return ownerService.getProfile(username);
	}
	
	@PutMapping("/profile/update")
	public Owner updateProfile(Authentication authentication, @RequestBody Owner updatedOwner) {
		String username = authentication.getName();
		return ownerService.updateProfile(username, updatedOwner);
	}
	
	@PutMapping("/home/update-vacancy")
	public VacancyDetails vacancyUpdate(Authentication authentication, @RequestBody VacancyDetailsDto vacancyDetailsDto) {
		String username = authentication.getName();
		return vacancyDetailsService.vacancyUpdate(username, vacancyDetailsDto);
	}
	
	
	@GetMapping("/home/get-vacancy")
	public String vacancyGet(Authentication authentication) {
		String username = authentication.getName();
		return vacancyDetailsService.vacancyGet(username).getVacancy();
	}
	
	@PostMapping("/logout")
	public  void logoutOwner(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		try {
			logoutHandlerService.logout(request, response, authentication);
			logoutSuccessHandlerService.onLogoutSuccess(request, response, authentication);
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@DeleteMapping("/delete")
		public String deleteOwner(Authentication authentication) {
			String username = authentication.getName();
			ownerService.deleteOwner(username);
			return "record deleted successfully";
		}
}
