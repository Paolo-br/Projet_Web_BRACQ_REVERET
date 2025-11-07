package com.example.alltogether.dto;

import java.util.Set;

public class UserProfileDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private int age;
    private int yearOfBirth;
    private String currentCity;
    private String countryOrigin;
    private String profilePictureUrl;
    private Set<String> roles;
    private Boolean showParticipationHistory;
    private String instagramUrl;
    private String facebookUrl;
    private String xUrl;

    // Constructeurs
    public UserProfileDTO() {}

    public UserProfileDTO(Long id, String firstName, String lastName, String email,
                          int age, int yearOfBirth, String currentCity, String countryOrigin,
                          String profilePictureUrl, Set<String> roles, String instagramUrl, String facebookUrl, String xUrl) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.yearOfBirth = yearOfBirth;
        this.currentCity = currentCity;
        this.countryOrigin = countryOrigin;
        this.profilePictureUrl = profilePictureUrl;
        this.roles = roles;
        this.instagramUrl = instagramUrl;
        this.facebookUrl = facebookUrl;
        this.xUrl = xUrl;
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
    
    public int getYearOfBirth() { return yearOfBirth; }
    public void setYearOfBirth(int yearOfBirth) { this.yearOfBirth = yearOfBirth; }

    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }

    public String getCountryOrigin() { return countryOrigin; }
    public void setCountryOrigin(String countryOrigin) { this.countryOrigin = countryOrigin; }

    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }

    public Boolean getShowParticipationHistory() { return showParticipationHistory == null ? true : showParticipationHistory; }
    public void setShowParticipationHistory(Boolean showParticipationHistory) { this.showParticipationHistory = showParticipationHistory; }

    public String getInstagramUrl() { return instagramUrl; }
    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }

    public String getFacebookUrl() { return facebookUrl; }
    public void setFacebookUrl(String facebookUrl) { this.facebookUrl = facebookUrl; }

    public String getXUrl() { return xUrl; }
    public void setXUrl(String xUrl) { this.xUrl = xUrl; }
}