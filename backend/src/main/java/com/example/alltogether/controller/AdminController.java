package com.example.alltogether.controller;

import com.example.alltogether.dto.UserProfileDTO;
import com.example.alltogether.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des administrateurs.
 *
 * Permet de :
 * - Promouvoir un utilisateur en administrateur
 * - Rétrograder un administrateur en utilisateur simple
 * - Lister tous les administrateurs
 * - Vérifier si un utilisateur est administrateur
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final RoleService roleService;

    public AdminController(RoleService roleService) {
        this.roleService = roleService;
    }

    /**
     * Promeut un utilisateur au rôle d'administrateur.
     */
    @PostMapping("/users/{userId}/promote")
    public ResponseEntity<String> promoteToAdmin(@PathVariable Long userId) {
        try {
            roleService.promoteToAdmin(userId);
            return ResponseEntity.ok("Utilisateur promu administrateur");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Rétrograde un administrateur au rôle d'utilisateur simple.
     */
    @PostMapping("/users/{userId}/demote")
    public ResponseEntity<String> demoteFromAdmin(@PathVariable Long userId) {
        try {
            roleService.demoteFromAdmin(userId);
            return ResponseEntity.ok("Utilisateur retiré des administrateurs");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Récupère la liste de tous les administrateurs.
     */
    @GetMapping("/admins")
    public List<UserProfileDTO> getAllAdmins() {
        return roleService.getAllAdmins();
    }

    /**
     * Vérifie si un utilisateur possède le rôle d'administrateur.
     */
    @GetMapping("/users/{userId}/is-admin")
    public ResponseEntity<Boolean> isUserAdmin(@PathVariable Long userId) {
        try {
            boolean isAdmin = roleService.isAdmin(userId);
            return ResponseEntity.ok(isAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}