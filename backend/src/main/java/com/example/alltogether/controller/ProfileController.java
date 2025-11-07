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
import java.util.HashMap;
import java.util.Map;

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

    // GET /api/profile/me/social/connect/{provider}
    // Retourne une URL pour initier un OAuth (placeholder/simple builder)
    @GetMapping("/me/social/connect/{provider}")
    public ResponseEntity<Map<String,String>> getSocialConnectUrl(@PathVariable String provider) {
        // NOTE: implémentation simple. Remplacez par la génération d'URL OAuth réelle si nécessaire.
        String redirectBase = "http://localhost:3000/social/callback"; // frontend callback
        String connectUrl = "https://auth.example.com/oauth/" + provider + "?redirect_uri=" + redirectBase + "&state=xyz";
        Map<String,String> res = new HashMap<>();
        res.put("url", connectUrl);
        return ResponseEntity.ok(res);
    }

    // POST /api/profile/me/social
    // Body: { provider: "instagram", url: "https://..." }
    @PostMapping("/me/social")
    public ResponseEntity<Void> linkSocial(@RequestBody com.example.alltogether.dto.SocialLinkDTO payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> current = userProfileService.getUserByEmail(email);
        if (current.isEmpty()) return ResponseEntity.notFound().build();
        Long id = current.get().getId();
        try {
            userProfileService.linkSocialUrl(id, payload.getProvider(), payload.getUrl());
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
