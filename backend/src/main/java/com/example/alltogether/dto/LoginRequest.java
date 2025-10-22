package com.example.alltogether.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO utilisé lors de la connexion (login).
 *
 * Il sert à transporter les données envoyées par l’utilisateur
 * (email + mot de passe) depuis la requête HTTP jusqu’au contrôleur.
 */

public class LoginRequest {

    @Email(message = "L'email doit être une adresse valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;

    // Getters et setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}