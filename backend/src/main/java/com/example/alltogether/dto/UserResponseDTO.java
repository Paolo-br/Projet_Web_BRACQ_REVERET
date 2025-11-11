package com.example.alltogether.dto;

import java.util.Set;

public class UserResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private int age;
    private String currentCity;
    private String countryOrigin;
    private String profilePictureUrl;
    private Set<String> roles;

    // Constructeurs
    public UserResponseDTO() {}

    public UserResponseDTO(Long id, String firstName, String lastName, String email, int age, String currentCity) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.currentCity = currentCity;
    }

    public UserResponseDTO(Long id, String firstName, String lastName, String email, int age, String currentCity, 
                           String countryOrigin, String profilePictureUrl, Set<String> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.currentCity = currentCity;
        this.countryOrigin = countryOrigin;
        this.profilePictureUrl = profilePictureUrl;
        this.roles = roles;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }

    public String getCountryOrigin() { return countryOrigin; }
    public void setCountryOrigin(String countryOrigin) { this.countryOrigin = countryOrigin; }

    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}