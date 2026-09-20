package soa.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    private static final String SECRETKEY = "qsdfgbnm,lpoigfdsazxdrtyuijbm,poknbvcxdfvbnjhgvc";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                SECRETKEY.getBytes(StandardCharsets.UTF_8)
            );


    public Claims validateToken(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}