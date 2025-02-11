package com.CH22_Project.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
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

import com.CH22_Project.models.User;
import com.CH22_Project.models.VacancyDetails;
import com.CH22_Project.service.LogoutHandlerService;
import com.CH22_Project.service.LogoutSuccessHandlerService;
import com.CH22_Project.service.UserService;
import com.CH22_Project.service.VacancyDetailsService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private VacancyDetailsService vacancyDetailsService;
	
	@Autowired
	private LogoutHandlerService logoutHandlerService;
	
	@Autowired
	private LogoutSuccessHandlerService logoutSuccessHandlerService;

	@PostMapping("/register")
	public ResponseEntity<User> insertUser(@RequestBody User user) {
		return userService.insertUser(user);
	}

	@PostMapping("/login")
	public ResponseEntity<String> findUser(@RequestBody User user){
		return new ResponseEntity<>(userService.verify(user),HttpStatus.OK);
	}

	@GetMapping("/home/searchHostels")
	public PagedModel<EntityModel<VacancyDetails>> searchHostels(@RequestParam(required = false) String searchTerm, @RequestParam(required = false) String vacancyStatus, @RequestParam(required = false) String city,  @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,  PagedResourcesAssembler<VacancyDetails> assembler){
		Page<VacancyDetails> pageResult = vacancyDetailsService.searchHostels(searchTerm,vacancyStatus,city,page,size);
		PagedModel<EntityModel<VacancyDetails>> pagedModel = assembler.toModel(pageResult);
		return pagedModel;
	}

	@GetMapping("/get-hostel")
	public ResponseEntity<Optional<VacancyDetails>> getHostel(@RequestParam(required = true) long vacancy_id){
		Optional<VacancyDetails> hostelDetail = vacancyDetailsService.getHostel(vacancy_id);
		return ResponseEntity.ok(hostelDetail);
	}

	@GetMapping("/profile")
	public User getProfile(Authentication authentication) {
		String username = authentication.getName();
		return userService.getProfile(username);
	}

	@PutMapping("/profile/update")
	public User updateProfile(Authentication authentication, @RequestBody User updatedUser) {
		String username = authentication.getName();
		return userService.updateProfile(username, updatedUser);
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
		userService.deleteUser(username);
		return "record deleted successfully";
	}

}
