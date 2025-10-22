// RoleService.java
package com.example.alltogether.service;

import com.example.alltogether.dto.UserProfileDTO;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RoleService {

    private final UserProfileRepository userProfileRepository;

    public RoleService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public void promoteToAdmin(Long userId) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!user.isAdmin()) {
            user.getRoles().add("ADMIN");
            userProfileRepository.save(user);
        }
    }

    public void demoteFromAdmin(Long userId) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        user.getRoles().remove("ADMIN");
        // S'assurer qu'il reste au moins le rôle USER
        if (user.getRoles().isEmpty()) {
            user.getRoles().add("USER");
        }
        userProfileRepository.save(user);
    }

    public boolean isAdmin(Long userId) {
        return userProfileRepository.findById(userId)
                .map(UserProfile::isAdmin)
                .orElse(false);
    }

    public List<UserProfileDTO> getAllAdmins() {
        return userProfileRepository.findAll().stream()
                .filter(UserProfile::isAdmin)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserProfileDTO convertToDTO(UserProfile user) {
        return new UserProfileDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAge(),
                user.getCurrentCity(),
                user.getCountryOrigin(),
                user.getProfilePictureUrl(),
                user.getRoles()
        );
    }
}