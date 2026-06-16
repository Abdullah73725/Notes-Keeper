package com.tyss.security;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

	private static final String SECRET = "my-secret-key";
	private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
	
	public static String generateToken(String email) {
		return Jwts.builder()
				.setSubject(email)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
				.signWith(KEY, SignatureAlgorithm.HS256)
				.compact();
	}	
	
	public static String extractEmail(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(KEY)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
}
