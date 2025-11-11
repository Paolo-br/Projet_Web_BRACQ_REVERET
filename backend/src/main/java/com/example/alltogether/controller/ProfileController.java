package com.example.alltogether.controller;

import com.example.alltogether.dto.UserProfileDTO;
import com.example.alltogether.dto.UserUpdateDTO;
import com.example.alltogether.service.ImageService;
import com.example.alltogether.service.UserProfileService;
import com.example.alltogether.service.FavoriteService;
import com.example.alltogether.model.Place;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion du profil utilisateur.
 *
 * Permet à un utilisateur authentifié de :
 * - Consulter et modifier son profil
 * - Gérer sa photo de profil
 * - Lier des comptes sociaux
 * - Gérer ses lieux favoris
 */
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserProfileService userProfileService;
    private final ImageService imageService;
    private final FavoriteService favoriteService;

    @Autowired
    public ProfileController(UserProfileService userProfileService, ImageService imageService, FavoriteService favoriteService) {
        this.userProfileService = userProfileService;
        this.imageService = imageService;
        this.favoriteService = favoriteService;
    }

    /**
     * Récupère le profil de l'utilisateur actuellement authentifié.
     */
    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> dto = userProfileService.getUserByEmail(email);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Met à jour le profil de l'utilisateur actuellement authentifié.
     */
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

    /**
     * Upload une photo de profil pour l'utilisateur actuellement authentifié.
     */
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

    /**
     * Supprime la photo de profil de l'utilisateur actuellement authentifié.
     */
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

    /**
     * Retourne une URL pour initier la connexion OAuth avec un fournisseur social.
     */
    @GetMapping("/me/social/connect/{provider}")
    public ResponseEntity<Map<String,String>> getSocialConnectUrl(@PathVariable String provider) {
        // NOTE: implémentation simple. Remplacez par la génération d'URL OAuth réelle si nécessaire.
        String redirectBase = "http://localhost:3000/social/callback"; // frontend callback
        String connectUrl = "https://auth.example.com/oauth/" + provider + "?redirect_uri=" + redirectBase + "&state=xyz";
        Map<String,String> res = new HashMap<>();
        res.put("url", connectUrl);
        return ResponseEntity.ok(res);
    }

    /**
     * Lie un compte de réseau social au profil de l'utilisateur.
     * Body: { provider: "instagram", url: "https://..." }
     */
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

    /**
     * Récupère la liste des lieux favoris de l'utilisateur.
     */
    @GetMapping("/me/favorites")
    public ResponseEntity<List<Place>> getMyFavorites() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> current = userProfileService.getUserByEmail(email);
        if (current.isEmpty()) return ResponseEntity.notFound().build();
        Long id = current.get().getId();
        List<Place> favs = favoriteService.getFavoritesForUser(id);
        return ResponseEntity.ok(favs);
    }

    /**
     * Ajoute un lieu aux favoris de l'utilisateur.
     */
    @PostMapping("/me/favorites/{placeId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long placeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> current = userProfileService.getUserByEmail(email);
        if (current.isEmpty()) return ResponseEntity.notFound().build();
        Long id = current.get().getId();
        favoriteService.addFavorite(id, placeId);
        return ResponseEntity.ok().build();
    }

    /**
     * Retire un lieu des favoris de l'utilisateur.
     */
    @DeleteMapping("/me/favorites/{placeId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long placeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<UserProfileDTO> current = userProfileService.getUserByEmail(email);
        if (current.isEmpty()) return ResponseEntity.notFound().build();
        Long id = current.get().getId();
        favoriteService.removeFavorite(id, placeId);
        return ResponseEntity.noContent().build();
    }
}
