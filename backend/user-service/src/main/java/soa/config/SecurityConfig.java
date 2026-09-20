package soa.config;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import io.jsonwebtoken.Claims;
import soa.security.JWTService;

@Configuration
public class SecurityConfig {

    private final JWTService JWT;

    public SecurityConfig(JWTService JWT) {
        this.JWT = JWT;
    }

    @Bean
    SecurityFilterChain sfc(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                .requestMatchers("/auth/register").permitAll()
                .requestMatchers("/auth/login").permitAll()
                
                .requestMatchers("/admin/**")
                .hasRole("ADMIN")

                .requestMatchers("/vendor/**")
                .hasRole("VENDOR")

                .requestMatchers("/customer/**")
                .hasRole("CUSTOMER")

                .anyRequest()
                .authenticated()
            )

            .oauth2ResourceServer(oauth -> oauth
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder())
                    .jwtAuthenticationConverter(
                        jwtAuthenticationConverter()
                    )
                )
            );

        return http.build();
    }

    @Bean
    JwtDecoder jwtDecoder() {

        return token -> {

            Claims claims = JWT.validateToken(token);

            return new Jwt(
                token,
                claims.getIssuedAt().toInstant(),
                claims.getExpiration().toInstant(),
                Map.of("alg", "HS256"),
                claims
            );
        };
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter authoritiesConverter =
                new JwtGrantedAuthoritiesConverter();

        authoritiesConverter.setAuthoritiesClaimName("role");

        authoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setPrincipalClaimName("sub");

        converter.setJwtGrantedAuthoritiesConverter(
                authoritiesConverter
        );

        return converter;
    }
    
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}