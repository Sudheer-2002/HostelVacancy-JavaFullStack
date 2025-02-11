package com.CH22_Project.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long user_id;
	@Column(nullable = false, unique = true)
	private String userusername;
	@Column(nullable = false)
	private String fname;
	@Column(nullable = false)
	private String lname;
	@Column(nullable = false, unique = true)
	private String useremail;
	@Column(nullable = false, unique = true)
	private long userphone;
	@Column(nullable = false)
	private String userpassword;

}
