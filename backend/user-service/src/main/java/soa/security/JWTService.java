package soa.security;

import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
	
	private static final String SECRETKEY="qsdfgbnm,lpoigfdsazxdrtyuijbm,poknbvcxdfvbnjhgvc";
	
	private final SecretKey key = Keys.hmacShaKeyFor(
			SECRETKEY.getBytes(StandardCharsets.UTF_8)
			);
	
	public String generateToken(long userId, String email, String role) {

	    return Jwts.builder()
	            .subject(email)
	            .claim("userId", userId)
	            .claim("role", role)
	            .issuedAt(new Date())
	            .expiration(
	                new Date(
	                    System.currentTimeMillis() + 1000 * 60 * 60
	                )
	            )
	            .signWith(key)
	            .compact();
	}
	
	public Claims validateToken(String token) {
		return Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
				
		
	}

}
