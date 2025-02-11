package com.CH22_Project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.CH22_Project.models.Token;

import jakarta.transaction.Transactional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long>{
	
	@Query("select t from Token t inner join t.owner o "
			+ "where o.ownerusername = :username and (t.expired = false and t.revoked = false)")
	List<Token> findAllValidTokensByOwnerusername(String username);
	
	Optional<Token> findByToken(String token);
	
	@Modifying
    @Transactional
	@Query("Delete from Token t where t.owner.ownerusername= :username")
	void deleteAllByOwnerusername(String username);
	
	@Modifying
    @Transactional
	@Query("Delete from Token t where t.user.userusername= :username")
	void deleteAllByUserusername(String username);
	
}
