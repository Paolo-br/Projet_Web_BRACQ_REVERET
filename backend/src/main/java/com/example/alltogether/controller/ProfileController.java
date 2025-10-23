package com.example.alltogether.controller;

import com.example.alltogether.dto.UserProfileDTO;
import com.example.alltogether.dto.UserUpdateDTO;
import com.example.alltogether.service.ImageService;
import com.example.alltogether.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserProfileService userProfileService;
    private final ImageService imageService;

    @Autowired
    public ProfileController(UserProfileService userProfileService, ImageService imageService) {
        this.userProfileService = userProfileService;
        this.imageService = imageService;
    }

    // GET /api/profile/me
    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> dto = userProfileService.getUserByEmail(email);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT /api/profile/me
    @PutMapping("/me")
    public ResponseEntity<UserProfileDTO> updateMyProfile(@RequestBody UserUpdateDTO updateDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> current = userProfileService.getUserByEmail(email);
        if (current.isEmpty()) return ResponseEntity.notFound().build();
        Long id = current.get().getId();
        return userProfileService.updateUser(id, updateDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/profile/me/photo
    @PostMapping("/me/photo")
    public ResponseEntity<String> uploadMyPhoto(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> current = userProfileService.getUserByEmail(email);
        if (current.isEmpty()) return ResponseEntity.notFound().build();
        Long id = current.get().getId();
        String url = imageService.uploadUserProfileImage(file, id);
        return ResponseEntity.ok(url);
    }

    // DELETE /api/profile/me/photo
    @DeleteMapping("/me/photo")
    public ResponseEntity<Void> deleteMyPhoto() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> current = userProfileService.getUserByEmail(email);
        if (current.isEmpty()) return ResponseEntity.notFound().build();
        Long id = current.get().getId();
        imageService.deleteUserProfileImage(id);
        return ResponseEntity.noContent().build();
    }
}
