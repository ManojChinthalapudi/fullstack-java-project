package com.manoj.realestate_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // Public health checks
                        .requestMatchers(
                                "/api/health",
                                "/api/db-health"
                        ).permitAll()

                        // Public residency GET APIs
                        .requestMatchers(HttpMethod.GET, "/api/residency/**").permitAll()

                        // Temporarily public user APIs for frontend integration
                        .requestMatchers(
                                "/api/user/register",
                                "/api/user/bookvisit/*",
                                "/api/user/cancelBooking/*",
                                "/api/user/allBookings",
                                "/api/user/toFav/*",
                                "/api/user/allFav"
                        ).permitAll()

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}