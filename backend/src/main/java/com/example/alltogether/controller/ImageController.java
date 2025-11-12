package com.example.alltogether.controller;

import com.example.alltogether.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des images.
 *
 * Gère l'upload et la suppression d'images pour :
 * - Les profils utilisateurs
 * - Les lieux (places)
 * - Les villes (cities)
 */
@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    /**
     * Upload d'une image de profil pour un utilisateur.
     */
    @PostMapping("/user/{userId}")
    public ResponseEntity<String> uploadUserImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(imageService.uploadUserProfileImage(file, userId));
    }

    /**
     * Suppression de l'image de profil d'un utilisateur.
     */
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteUserImage(@PathVariable Long userId) {
        imageService.deleteUserProfileImage(userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Upload de plusieurs images pour un lieu (place).
     */
    @PostMapping("/place/{placeId}")
    public ResponseEntity<List<String>> uploadPlaceImages(@PathVariable Long placeId, @RequestParam("files") List<MultipartFile> files) {
        return ResponseEntity.ok(imageService.uploadPlacePhotos(files, placeId));
    }

    /**
     * Suppression d'une image spécifique d'un lieu.
     */
    @DeleteMapping("/place/{placeId}")
    public ResponseEntity<Void> deletePlaceImage(@PathVariable Long placeId, @RequestParam("url") String imageUrl) {
        imageService.deletePlacePhoto(placeId, imageUrl);
        return ResponseEntity.noContent().build();
    }

    /**
     * Upload d'une image pour une ville.
     */
    @PostMapping("/city/{cityId}")
    public ResponseEntity<String> uploadCityImage(@PathVariable Long cityId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(imageService.uploadCityImage(file, cityId));
    }

    /**
     * Suppression de l'image d'une ville.
     */
    @DeleteMapping("/city/{cityId}")
    public ResponseEntity<Void> deleteCityImage(@PathVariable Long cityId) {
        imageService.deleteCityImage(cityId);
        return ResponseEntity.noContent().build();
    }
}
