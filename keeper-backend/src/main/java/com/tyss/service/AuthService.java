package com.tyss.service;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.tyss.dto.AuthRequest;
import com.tyss.entity.User;
import com.tyss.repository.UserRepository;
import com.tyss.security.JwtUtil;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public User register(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	public String login(AuthRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User Not Found"));

		boolean isPasswordCorrect = encoder.matches(request.getPassword(), user.getPassword());

		if (!isPasswordCorrect) {
			throw new RuntimeException("Invalid Password");
		}
		return JwtUtil.generateToken(user.getEmail());
	}

	public String googleLogin(String googleToken) {

		try {

			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),
					GsonFactory.getDefaultInstance())
					.setAudience(Collections
							.singletonList("509932624944-a03hncn3mdtr02276vcferq472np54iq.apps.googleusercontent.com"))
					.build();

			GoogleIdToken idToken = verifier.verify(googleToken);

			if (idToken != null) {
				Payload payload = idToken.getPayload();
				String email = payload.getEmail();
				User user = userRepository.findByEmail(email).orElseGet(() -> {
					User newUser = new User();
					newUser.setEmail(email);
					newUser.setPassword("");
					return userRepository.save(newUser);
				});
				return JwtUtil.generateToken(user.getEmail());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		throw new RuntimeException("Invalid Google Token");
	}
}
