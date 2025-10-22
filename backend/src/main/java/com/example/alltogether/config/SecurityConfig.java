package com.example.alltogether.config;

import com.example.alltogether.security.JwtAuthenticationFilter;
import com.example.alltogether.security.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Classe de configuration principale de Spring Security.
 *
 * Elle définit :
 * - quels endpoints sont accessibles librement ou protégés
 * - quel filtre JWT doit s'exécuter
 * - comment sont gérés les mots de passe et l'authentification
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Configuration CORS pour autoriser les requêtes depuis le frontend.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",  // Vite dev server
            "http://localhost:3000",  // React dev server (alternative)
            "http://localhost:4200"   // Angular dev server (alternative)
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

    /**
     * Définit la configuration de sécurité de l'application.
     * - Désactive CSRF (utile pour une API REST stateless)
     * - Indique que l'on ne garde pas de session côté serveur (JWT = stateless)
     * - Configure les droits d'accès en fonction des endpoints et des rôles
     * - Ajoute le filtre JWT dans la chaîne de filtres de Spring Security
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, UserDetailsService userDetailsService) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Endpoints publics (accessibles sans authentification)
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/map/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/cities/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/places/**").permitAll()
                        .requestMatchers("/api/images/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()

                        // Endpoints USER (lecture + participations)
                        .requestMatchers("/api/participations/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/profile/**").hasAnyRole("USER", "ADMIN")

                        // Endpoints ADMIN seulement (création, modification, suppression)
                        .requestMatchers(HttpMethod.POST, "/api/cities/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/cities/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/cities/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/places/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/places/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/places/**").hasRole("ADMIN")
                        .requestMatchers("/api/users/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // Toutes les autres requêtes nécessitent une authentification
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Déclare le PasswordEncoder utilisé pour hacher les mots de passe.
     * Ici : BCrypt, robuste et recommandé pour le stockage sécurisé.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Fournit un AuthenticationManager qui délègue la vérification des identifiants.
     * Utilisé notamment dans AuthController pour le login.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
