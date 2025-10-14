package com.example.alltogether.controller;

import com.example.alltogether.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    // === USER ===
    @PostMapping("/user/{userId}")
    public ResponseEntity<String> uploadUserImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(imageService.uploadUserProfileImage(file, userId));
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteUserImage(@PathVariable Long userId) {
        imageService.deleteUserProfileImage(userId);
        return ResponseEntity.noContent().build();
    }

    // === PLACE ===
    @PostMapping("/place/{placeId}")
    public ResponseEntity<List<String>> uploadPlaceImages(@PathVariable Long placeId, @RequestParam("files") List<MultipartFile> files) {
        return ResponseEntity.ok(imageService.uploadPlacePhotos(files, placeId));
    }

    @DeleteMapping("/place/{placeId}")
    public ResponseEntity<Void> deletePlaceImage(@PathVariable Long placeId, @RequestParam("url") String imageUrl) {
        imageService.deletePlacePhoto(placeId, imageUrl);
        return ResponseEntity.noContent().build();
    }

    // === CITY ===
    @PostMapping("/city/{cityId}")
    public ResponseEntity<String> uploadCityImage(@PathVariable Long cityId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(imageService.uploadCityImage(file, cityId));
    }

    @DeleteMapping("/city/{cityId}")
    public ResponseEntity<Void> deleteCityImage(@PathVariable Long cityId) {
        imageService.deleteCityImage(cityId);
        return ResponseEntity.noContent().build();
    }
}
