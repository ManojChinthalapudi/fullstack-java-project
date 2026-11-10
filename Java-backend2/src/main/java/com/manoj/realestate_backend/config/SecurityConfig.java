package com.manoj.realestate_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

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
                // Return 401 (not 403) for any future endpoint that really
                // requires authentication but receives no credentials.
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                        )
                )
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Internal error dispatch. Spring Security also filters
                        // ERROR dispatches, so without this rule every real
                        // 400/404/409/500 response is re-dispatched to /error,
                        // fails authentication and is replaced by a 403.
                        .requestMatchers("/error", "/error/**").permitAll()

                        // Public health checks
                        .requestMatchers(
                                "/api/health",
                                "/api/db-health"
                        ).permitAll()

                        // Public residency GET APIs
                        .requestMatchers(HttpMethod.GET, "/api/residency/**").permitAll()

                        // Temporarily public residency write APIs for frontend
                        // integration (same approach as the public user APIs).
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/residency/create",
                                "/api/residency/adminCreate",
                                "/api/residency/acceptCreate",
                                "/api/residency/rejectCreate"
                        ).permitAll()

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
