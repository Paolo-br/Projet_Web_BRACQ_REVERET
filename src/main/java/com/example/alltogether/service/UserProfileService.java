package com.example.alltogether.service;


import com.example.alltogether.model.UserProfile;
import com.example.alltogether.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<UserProfile> getAllUsers() {
        return userProfileRepository.findAll();
    }

    public Optional<UserProfile> getUserById(Long id) {
        return userProfileRepository.findById(id);
    }

    public Optional<UserProfile> getUserByEmail(String email) {
        return userProfileRepository.findByEmail(email);
    }

    public UserProfile createUser(UserProfile userProfile) {
        userProfile.setPassword(passwordEncoder.encode(userProfile.getPassword()));
        return userProfileRepository.save(userProfile);
    }

    public UserProfile updateUser(Long id, UserProfile userProfileDetails) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userProfile.setFirstName(userProfileDetails.getFirstName());
        userProfile.setLastName(userProfileDetails.getLastName());
        userProfile.setEmail(userProfileDetails.getEmail());
        userProfile.setAge(userProfileDetails.getAge());
        userProfile.setCurrentCity(userProfileDetails.getCurrentCity());
        userProfile.setCountryOrigin(userProfileDetails.getCountryOrigin());
        return userProfileRepository.save(userProfile);
    }

    public void deleteUser(Long id) {
        userProfileRepository.deleteById(id);
    }
}
