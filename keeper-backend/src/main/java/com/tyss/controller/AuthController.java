package com.tyss.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tyss.dto.AuthRequest;
import com.tyss.entity.User;
import com.tyss.repository.UserRepository;
import com.tyss.security.JwtUtil;
import com.tyss.service.AuthService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private AuthService authService;
	
	@PostMapping("/google")
	public String googleLogin(@RequestBody Map<String, String> body) {
		String token = body.get("token");
		return authService.googleLogin(token);
	}

	@PostMapping("/register")
	public User register(@RequestBody User user) {

		return authService.register(user);
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody AuthRequest request) {

		Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

		if (optionalUser.isPresent()) {
			User user = optionalUser.get();

			if(passwordEncoder.matches(request.getPassword(), user.getPassword())) {
				String token = JwtUtil.generateToken(user.getEmail());
				
				return ResponseEntity.ok(token);
			}
		}
		return ResponseEntity.status(401).body("Invalid username or password");
	}
}
