package com.CH22_Project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CH22_Project.models.Owner;
import com.CH22_Project.models.Token;
import com.CH22_Project.models.TokenType;
import com.CH22_Project.models.User;
import com.CH22_Project.repository.TokenRepository;

@Service
public class TokenServiceImpl implements TokenService{
	
	@Autowired
	private TokenRepository tokenRepository;

	@Override
	public void saveOwnerToken(String token, Owner owner) {
		Token token2= new Token();
		token2.setOwner(owner);
		token2.setToken(token);
		token2.setTokenType(TokenType.BEARER);
		token2.setExpired(false);
		token2.setRevoked(false);
		tokenRepository.save(token2);
	}

	@Override
	public void revokeToken(String ownerusername) {
		var validTokens = tokenRepository.findAllValidTokensByOwnerusername(ownerusername);
		if(validTokens.isEmpty()) {
			return;
		}
		validTokens.forEach(t -> {
			t.setExpired(true);
			t.setRevoked(true);
		});
		tokenRepository.saveAll(validTokens);
	}

	@Override
	public void saveUserToken(String token, User user) {
		Token token2= new Token();
		token2.setUser(user);
		token2.setToken(token);
		token2.setTokenType(TokenType.BEARER);
		token2.setExpired(false);
		token2.setRevoked(false);
		tokenRepository.save(token2);
	}

}
