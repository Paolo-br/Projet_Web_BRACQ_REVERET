package com.example.alltogether.config;

import com.example.alltogether.security.JwtAuthenticationFilter;
import com.example.alltogether.security.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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


/**
 * Classe de configuration principale de Spring Security.
 *
 * Elle définit :
 * - quels endpoints sont accessibles librement ou protégés
 * - quel filtre JWT doit s’exécuter
 * - comment sont gérés les mots de passe et l’authentification
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Définit la configuration de sécurité de l’application.
     * - Désactive CSRF (utile pour une API REST stateless)
     * - Indique que l’on ne garde pas de session côté serveur (JWT = stateless)
     * - Configure les droits d’accès en fonction des endpoints et des rôles
     * - Ajoute le filtre JWT dans la chaîne de filtres de Spring Security
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, UserDetailsService userDetailsService) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()  // Autorise explicitement l'inscription et la connexion
                        .requestMatchers("/api/cities/**").permitAll()  // Autorise l'accès aux villes
                        .requestMatchers("/api/places/**").hasAnyRole("USER", "ADMIN")  // Restreint l'accès aux lieux
                        .requestMatchers("/api/users/**").hasRole("ADMIN")  // Restreint l'accès aux utilisateurs
                        .anyRequest().authenticated()  // Toutes les autres requêtes nécessitent une authentification
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, userDetailsService), UsernamePasswordAuthenticationFilter.class);

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
