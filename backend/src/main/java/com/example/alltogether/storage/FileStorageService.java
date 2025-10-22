package com.example.alltogether.storage;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final List<String> ALLOWED_EXTENSIONS =
            Arrays.asList("jpg", "jpeg", "png", "gif", "webp");

    private final Path rootLocation;

    // Permet de configurer le répertoire d’upload dans application.properties :
    // exemple : file.upload-dir=uploads
    public FileStorageService(@Value("${file.upload-dir:uploads}") String uploadDir) {
        this.rootLocation = Paths.get(uploadDir);
    }

    // Création du dossier d’upload au démarrage
    @PostConstruct
    public void init() {
        try {
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }
        } catch (IOException e) {
            throw new RuntimeException("Impossible d’initialiser le dossier de stockage", e);
        }
    }

    // ==========================================
    // Sauvegarde d’un fichier
    // ==========================================
    public String store(MultipartFile file) {
        try {
            validateFile(file);

            String originalFilename = file.getOriginalFilename();
            String extension = getFileExtension(originalFilename);
            String filename = UUID.randomUUID() + "." + extension;

            Path destinationFile = rootLocation.resolve(filename).normalize().toAbsolutePath();

            // Sécurité : on s’assure que le chemin reste dans le dossier autorisé
            if (!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
                throw new RuntimeException("Chemin de fichier non autorisé");
            }

            file.transferTo(destinationFile);

            // Retourne l’URL relative (tu peux l’adapter selon ton front)
            return "/uploads/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du stockage du fichier", e);
        }
    }

    // ==========================================
    //  Suppression d’un fichier
    // ==========================================
    public void deleteFile(String fileUrl) {
        try {
            // fileUrl = "/uploads/nom.jpg" → on extrait juste le nom du fichier
            String filename = Paths.get(fileUrl).getFileName().toString();
            Path filePath = rootLocation.resolve(filename);

            if (Files.exists(filePath)) {
                Files.delete(filePath);
            } else {
                throw new RuntimeException("Fichier non trouvé : " + fileUrl);
            }

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la suppression du fichier", e);
        }
    }

    // ==========================================
    // Validation des fichiers
    // ==========================================
    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Fichier vide");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("Fichier trop volumineux (> 5MB)");
        }

        String extension = getFileExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new RuntimeException("Type de fichier non autorisé");
        }
    }

    private String getFileExtension(String filename) {
        return filename != null ? filename.substring(filename.lastIndexOf('.') + 1) : "";
    }
}
