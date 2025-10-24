package com.example.alltogether.service;

import com.example.alltogether.dto.UserCreateDTO;
import com.example.alltogether.exception.EmailAlreadyExistsException;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.repository.UserProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService implements UserDetailsService {

    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserProfileRepository userProfileRepository, PasswordEncoder passwordEncoder) {
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Inscription d'un nouvel utilisateur.
     * Vérifie que l'email n'existe pas déjà.
     * Encode le mot de passe avec BCrypt.
     */
    public String register(UserCreateDTO dto) {
        // Vérifie si l'email existe déjà
        if (userProfileRepository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException("L'adresse email " + dto.getEmail() + " est déjà utilisée");
        }

        // Crée l'entité UserProfile
        UserProfile user = new UserProfile();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setYearOfBirth(dto.getYearOfBirth());
        user.setCurrentCity(dto.getCurrentCity());
        user.setCountryOrigin(dto.getCountryOrigin());
        user.setRoles("USER"); // rôle par défaut
        if (dto.getEmail().contains("admin") || dto.getEmail().contains("super")) {
            user.setRoles(Set.of("USER", "ADMIN")); // Admin a les deux rôles
        } else {
            user.setRoles(Set.of("USER")); // User normal
        }

        userProfileRepository.save(user);
        return "Utilisateur inscrit avec succès";
    }

    /**
     * Chargement de l'utilisateur pour Spring Security
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userProfileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + email));
    }

    // Méthode pour promouvoir un utilisateur en ADMIN
    @Transactional
    public void promoteToAdmin(Long userId) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.getRoles().add("ADMIN");
        userProfileRepository.save(user);
    }
}
