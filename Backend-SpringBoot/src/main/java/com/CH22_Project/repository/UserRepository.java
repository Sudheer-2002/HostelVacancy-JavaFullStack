package com.CH22_Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CH22_Project.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	User findByUserusername(String userusername);

}
