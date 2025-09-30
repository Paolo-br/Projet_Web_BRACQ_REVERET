package com.example.alltogether.controller;

import com.example.alltogether.model.UserProfile;
import com.example.alltogether.model.dto.LoginRequest;
import com.example.alltogether.service.AuthService;
import com.example.alltogether.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserProfile userProfile) {
        return ResponseEntity.ok(authService.register(userProfile));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
       // Si l’authentification réussit, Spring retourne un objet Authentication
        // contenant l’utilisateur authentifié (implémentation de UserDetails)
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // On génère un token JWT pour cet utilisateur
        String token = jwtTokenProvider.generateToken(userDetails);

        // On renvoie le token dans la réponse HTTP
        return ResponseEntity.ok(token);
    }
}
