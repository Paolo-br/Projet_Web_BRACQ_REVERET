package com.example.alltogether.controller;

import com.example.alltogether.dto.UserProfileDTO;
import com.example.alltogether.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final RoleService roleService;

    public AdminController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/users/{userId}/promote")
    public ResponseEntity<String> promoteToAdmin(@PathVariable Long userId) {
        try {
            roleService.promoteToAdmin(userId);
            return ResponseEntity.ok("Utilisateur promu administrateur");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/users/{userId}/demote")
    public ResponseEntity<String> demoteFromAdmin(@PathVariable Long userId) {
        try {
            roleService.demoteFromAdmin(userId);
            return ResponseEntity.ok("Utilisateur retiré des administrateurs");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admins")
    public List<UserProfileDTO> getAllAdmins() {
        return roleService.getAllAdmins();
    }

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