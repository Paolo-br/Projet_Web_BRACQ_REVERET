package com.example.alltogether.controller;

import com.example.alltogether.dto.UserCreateDTO;
import jakarta.validation.Valid;
import com.example.alltogether.dto.LoginRequest;
import com.example.alltogether.service.AuthService;
import com.example.alltogether.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur REST qui gère l’authentification des utilisateurs :
 * - Inscription (register)
 * - Connexion (login)
 *
 * Il utilise AuthService pour la logique métier
 * et JwtTokenProvider pour générer les tokens JWT.
 */
@RestController
@RequestMapping("/api/auth") // Toutes les routes de ce contrôleur commencent par /api/auth
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    @Valid
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserCreateDTO userCreateDTO) {
        return ResponseEntity.ok(authService.register(userCreateDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(userDetails);

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            // Email ou mot de passe incorrect
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Email ou mot de passe incorrect");
            return ResponseEntity.status(401).body(errorResponse);

        } catch (UsernameNotFoundException e) {
            // Utilisateur non trouvé
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Utilisateur non trouvé");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

}
