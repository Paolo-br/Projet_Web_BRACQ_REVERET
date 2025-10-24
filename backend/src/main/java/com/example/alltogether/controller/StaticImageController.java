package com.example.alltogether.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;

/**
 * Contrôleur pour servir les images statiques depuis le classpath
 */
@RestController
@RequestMapping("/uploads")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:4200"})
public class StaticImageController {

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getCityImage(@PathVariable String filename) {
        try {
            // 1) Try to load from classpath:/static/uploads (packaged resources)
            Resource resource = new ClassPathResource("static/uploads/" + filename);

            // 2) If not found on classpath, try the filesystem path (useful in dev)
            if (!resource.exists() || !resource.isReadable()) {
                java.nio.file.Path fsPath = java.nio.file.Paths.get("src/main/resources/static/uploads").resolve(filename).normalize().toAbsolutePath();
                if (java.nio.file.Files.exists(fsPath) && java.nio.file.Files.isRegularFile(fsPath)) {
                    resource = new org.springframework.core.io.UrlResource(fsPath.toUri());
                }
            }

            if (resource == null || !resource.exists()) {
                System.out.println("Image non trouvée: uploads/" + filename);
                return ResponseEntity.notFound().build();
            }

            System.out.println("Image trouvée: uploads/" + filename);

            // Déterminer le type
            String contentType = getContentType(filename);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=31536000")
                    .body(resource);

        } catch (Exception e) {
            System.err.println("Erreur lors du chargement de l'image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/city/{filename:.+}")
    public ResponseEntity<Resource> getCityImage2(@PathVariable String filename) {
        try {
            // 1) Try to load from classpath:/static/uploads/city (packaged resources)
            Resource resource = new ClassPathResource("static/uploads/city/" + filename);
            
            // 2) If not found on classpath, try the filesystem path (useful in dev)
            if (!resource.exists() || !resource.isReadable()) {
                System.out.println("Tentative de chargement depuis le filesystem pour: " + filename);
                
                // Essayer plusieurs chemins possibles
                java.nio.file.Path[] possiblePaths = {
                    java.nio.file.Paths.get("src/main/resources/static/uploads/city").resolve(filename).normalize().toAbsolutePath(),
                    java.nio.file.Paths.get("backend/src/main/resources/static/uploads/city").resolve(filename).normalize().toAbsolutePath()
                };
                
                for (java.nio.file.Path fsPath : possiblePaths) {
                    System.out.println("Tentative: " + fsPath.toString());
                    if (java.nio.file.Files.exists(fsPath) && java.nio.file.Files.isRegularFile(fsPath)) {
                        resource = new org.springframework.core.io.UrlResource(fsPath.toUri());
                        System.out.println("✅ Image city trouvée sur filesystem: " + fsPath.toString());
                        break;
                    }
                }
                
                if (!resource.exists()) {
                    System.out.println("❌ Image city non trouvée sur aucun chemin filesystem");
                }
            } else {
                System.out.println("✅ Image city trouvée sur classpath: " + filename);
            }
            
            if (resource == null || !resource.exists()) {
                System.out.println("❌ Image city non trouvée (finale): uploads/city/" + filename);
                return ResponseEntity.notFound().build();
            }

            String contentType = getContentType(filename);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=31536000")
                    .body(resource);
                    
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du chargement de l'image city: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/places/{filename:.+}")
    public ResponseEntity<Resource> getPlaceImage(@PathVariable String filename) {
        try {
            // 1) Try to load from classpath:/static/uploads/places (packaged resources)
            Resource resource = new ClassPathResource("static/uploads/places/" + filename);
            
            // 2) If not found on classpath, try the filesystem path (useful in dev)
            if (!resource.exists() || !resource.isReadable()) {
                System.out.println("Tentative de chargement depuis le filesystem pour: " + filename);
                
                // Essayer plusieurs chemins possibles
                java.nio.file.Path[] possiblePaths = {
                    java.nio.file.Paths.get("src/main/resources/static/uploads/places").resolve(filename).normalize().toAbsolutePath(),
                    java.nio.file.Paths.get("backend/src/main/resources/static/uploads/places").resolve(filename).normalize().toAbsolutePath()
                };
                
                for (java.nio.file.Path fsPath : possiblePaths) {
                    System.out.println("Tentative: " + fsPath.toString());
                    if (java.nio.file.Files.exists(fsPath) && java.nio.file.Files.isRegularFile(fsPath)) {
                        resource = new org.springframework.core.io.UrlResource(fsPath.toUri());
                        System.out.println("✅ Image place trouvée sur filesystem: " + fsPath.toString());
                        break;
                    }
                }
                
                if (!resource.exists()) {
                    System.out.println("❌ Image place non trouvée sur aucun chemin filesystem");
                }
            } else {
                System.out.println("✅ Image place trouvée sur classpath: " + filename);
            }
            
            if (resource == null || !resource.exists()) {
                System.out.println("❌ Image place non trouvée (finale): uploads/places/" + filename);
                return ResponseEntity.notFound().build();
            }

            String contentType = getContentType(filename);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=31536000")
                    .body(resource);
                    
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du chargement de l'image place: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String getContentType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        return switch (extension) {
            case "jpg", "jpeg" -> "image/jpeg";
            case "png" -> "image/png";
            case "gif" -> "image/gif";
            case "webp" -> "image/webp";
            default -> "application/octet-stream";
        };
    }
}
