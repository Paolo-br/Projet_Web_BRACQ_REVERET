package com.example.alltogether.controller;

import com.example.alltogether.dto.*;
import com.example.alltogether.service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des profils utilisateurs.
 *
 * Permet aux administrateurs de :
 * - Lister tous les utilisateurs
 * - Consulter le profil d'un utilisateur
 * - Créer, modifier ou supprimer un utilisateur
 * - Changer le mot de passe d'un utilisateur
 */
@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * Récupère la liste de tous les utilisateurs (version light avec UserResponseDTO).
     */
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userProfileService.getAllUsers();
    }

    /**
     * Récupère le profil complet d'un utilisateur par son ID (avec UserProfileDTO).
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getUserById(@PathVariable Long id) {
        return userProfileService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Crée un nouvel utilisateur avec UserCreateDTO.
     */
    @Valid
    @PostMapping
    public UserProfileDTO createUser(@RequestBody UserCreateDTO userCreateDTO) {
        return userProfileService.createUser(userCreateDTO);
    }

    /**
     * Met à jour les informations d'un utilisateur existant.
     */
    @Valid
    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDTO> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO userUpdateDTO) {
        return userProfileService.updateUser(id, userUpdateDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Supprime un utilisateur par son ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userProfileService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Met à jour le mot de passe d'un utilisateur.
     */
    @Valid
    @PutMapping("/{id}/password")
    public ResponseEntity<Void> updatePassword(@PathVariable Long id, @RequestBody UpdatePasswordDTO dto) {
        try {
            userProfileService.updatePassword(id, dto);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
