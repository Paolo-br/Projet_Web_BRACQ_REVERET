package com.example.alltogether.controller;

import com.example.alltogether.dto.*;
import com.example.alltogether.service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    // GET /api/users -> liste “light” avec UserResponseDTO
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userProfileService.getAllUsers();
    }

    // GET /api/users/{id} -> profil complet avec UserProfileDTO
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getUserById(@PathVariable Long id) {
        return userProfileService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/users -> création d’un utilisateur avec UserCreateDTO
    @Valid
    @PostMapping
    public UserProfileDTO createUser(@RequestBody UserCreateDTO userCreateDTO) {
        return userProfileService.createUser(userCreateDTO);
    }

    // PUT /api/users/{id} -> mise à jour d’un utilisateur
    @Valid
    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDTO> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO userUpdateDTO) {
        return userProfileService.updateUser(id, userUpdateDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/users/{id} -> suppression
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userProfileService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // PUT /api/users/{id}/password -> mise à jour du mot de passe
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
