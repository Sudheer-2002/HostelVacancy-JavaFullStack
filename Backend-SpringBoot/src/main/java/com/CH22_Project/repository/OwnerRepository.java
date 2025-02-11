package com.CH22_Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.CH22_Project.models.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long>{

	Owner findByOwnerusername(String ownerusername);
	
	@Query("SELECT MAX(o.ownerusername) FROM Owner o WHERE o.ownerusername LIKE :prefix%")
	String findMaxOwnerusernameByPrefix(String prefix);

}
