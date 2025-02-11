package com.CH22_Project.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

import com.CH22_Project.JwtUtil.JwtUtil;
import com.CH22_Project.repository.TokenRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class LogoutSuccessHandlerService implements LogoutSuccessHandler{

	
	@Autowired
	private TokenRepository tokenRepository;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		final String authHeader = request.getHeader("Authorization");
		String token = null;
		if(authHeader!=null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
		}
		System.out.println(token);
		var storedToken = tokenRepository.findByToken(token).orElse(null);
		if(storedToken!=null) {
			if(jwtUtil.extractRole(token).equals("OWNER")) {
				tokenRepository.deleteAllByOwnerusername(jwtUtil.extractUsername(token));
			}else if(jwtUtil.extractRole(token).equals("USER")) {
				tokenRepository.deleteAllByUserusername(jwtUtil.extractUsername(token));
			}
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("Logged out successfully :)");
	        response.getWriter().flush();
		}
	}

}
