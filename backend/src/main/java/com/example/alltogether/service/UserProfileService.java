package com.example.alltogether.service;

import com.example.alltogether.dto.*;
import com.example.alltogether.exception.EmailAlreadyExistsException;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // ========================
    // LISTE DES UTILISATEURS
    // ========================
    public List<UserResponseDTO> getAllUsers() {
        return userProfileRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserProfileDTO> getUserById(Long id) {
        return userProfileRepository.findById(id)
                .map(this::toProfileDTO);
    }

    public Optional<UserProfileDTO> getUserByEmail(String email) {
        return userProfileRepository.findByEmail(email)
                .map(this::toProfileDTO);
    }

    // ========================
    // CRÉATION D’UN UTILISATEUR
    // ========================
    public UserProfileDTO createUser(UserCreateDTO userCreateDTO) {
        if (userProfileRepository.existsByEmail(userCreateDTO.getEmail())) {
            throw new EmailAlreadyExistsException("L'adresse email " + userCreateDTO.getEmail() + " est déjà utilisée");
        }
        UserProfile user = new UserProfile();
        user.setFirstName(userCreateDTO.getFirstName());
        user.setLastName(userCreateDTO.getLastName());
        user.setEmail(userCreateDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userCreateDTO.getPassword()));
        user.setYearOfBirth(userCreateDTO.getYearOfBirth());
        user.setCurrentCity(userCreateDTO.getCurrentCity());
        user.setCountryOrigin(userCreateDTO.getCountryOrigin());
        user.setRoles("USER");
    // Par défaut, autoriser l'affichage de l'historique de participation
    user.setShowParticipationHistory(true);

        UserProfile savedUser = userProfileRepository.save(user);
        return toProfileDTO(savedUser);
    }


    // ========================
    // MISE À JOUR D’UN UTILISATEUR
    // ========================
    public Optional<UserProfileDTO> updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        return userProfileRepository.findById(id)
                .map(user -> {
                    // Vérifier si l'email est modifié et déjà utilisé par un autre utilisateur
                    if (!user.getEmail().equals(userUpdateDTO.getEmail()) &&
                            userProfileRepository.existsByEmailAndIdNot(userUpdateDTO.getEmail(), id)) {
                        throw new EmailAlreadyExistsException(
                                "L'email " + userUpdateDTO.getEmail() + " est déjà utilisé par un autre utilisateur"
                        );
                    }

                    // Mise à jour des champs
                    user.setFirstName(userUpdateDTO.getFirstName());
                    user.setLastName(userUpdateDTO.getLastName());
                    user.setEmail(userUpdateDTO.getEmail());
                    user.setYearOfBirth(userUpdateDTO.getYearOfBirth());
                    user.setCurrentCity(userUpdateDTO.getCurrentCity());
                    user.setCountryOrigin(userUpdateDTO.getCountryOrigin());
                    if (userUpdateDTO.getProfilePictureUrl() != null) {
                        user.setProfilePictureUrl(userUpdateDTO.getProfilePictureUrl());
                    }

                    // Social links
                    if (userUpdateDTO.getInstagramUrl() != null) {
                        user.setInstagramUrl(userUpdateDTO.getInstagramUrl());
                    }
                    if (userUpdateDTO.getFacebookUrl() != null) {
                        user.setFacebookUrl(userUpdateDTO.getFacebookUrl());
                    }
                    if (userUpdateDTO.getXUrl() != null) {
                        user.setXUrl(userUpdateDTO.getXUrl());
                    }

                    // Mettre à jour la visibilité de l'historique si fourni
                    if (userUpdateDTO.getShowParticipationHistory() != null) {
                        user.setShowParticipationHistory(userUpdateDTO.getShowParticipationHistory());
                    }

                    // Sauvegarde et conversion en DTO
                    UserProfile updatedUser = userProfileRepository.save(user);
                    return toProfileDTO(updatedUser);
                });
    }



    // ========================
    // SUPPRESSION
    // ========================
    public void deleteUser(Long id) {
        userProfileRepository.deleteById(id);
    }

    // ========================
    // MISE À JOUR DU MOT DE PASSE
    // ========================
    public void updatePassword(Long id, UpdatePasswordDTO dto) {
        UserProfile user = userProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // SI ADMIN → pas besoin de vérifier l'ancien mot de passe
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            // Pour les users normaux, vérifier l'ancien mot de passe
            if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
                throw new SecurityException("Mot de passe actuel incorrect");
            }
        }

        // Vérifier que le nouveau mot de passe est différent
        if (passwordEncoder.matches(dto.getNewPassword(), user.getPassword())) {
            throw new RuntimeException("Le nouveau mot de passe doit être différent de l'actuel");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userProfileRepository.save(user);
    }

    // ========================
    // CONVERSIONS VERS DTO
    // ========================
    private UserResponseDTO toResponseDTO(UserProfile user) {
        return new UserResponseDTO(
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

    private UserProfileDTO toProfileDTO(UserProfile user) {
    UserProfileDTO dto = new UserProfileDTO(
        user.getId(),
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        user.getAge(),
        user.getYearOfBirth(),
        user.getCurrentCity(),
        user.getCountryOrigin(),
        user.getProfilePictureUrl(),
        user.getRoles(),
        user.getInstagramUrl(),
        user.getFacebookUrl(),
        user.getXUrl()
    );
    dto.setShowParticipationHistory(user.getShowParticipationHistory());
    return dto;
    }

    public void updateProfilePicture(Long userId, String imageUrl) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setProfilePictureUrl(imageUrl);
        userProfileRepository.save(user);
    }

    // Lier un profil social (instagram/facebook/x) au compte utilisateur
    public void linkSocialUrl(Long userId, String provider, String url) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        switch (provider.toLowerCase()) {
            case "instagram":
            case "insta":
                user.setInstagramUrl(url);
                break;
            case "facebook":
                user.setFacebookUrl(url);
                break;
            case "x":
            case "twitter":
                user.setXUrl(url);
                break;
            default:
                throw new IllegalArgumentException("Provider inconnu: " + provider);
        }
        userProfileRepository.save(user);
    }
}
