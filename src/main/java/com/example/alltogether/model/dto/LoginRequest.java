package com.example.alltogether.model.dto;

/**
 * DTO utilisé lors de la connexion (login).
 *
 * Il sert à transporter les données envoyées par l’utilisateur
 * (email + mot de passe) depuis la requête HTTP jusqu’au contrôleur.
 */

public class LoginRequest {
    private String email;
    private String password;

    // Getters et setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
