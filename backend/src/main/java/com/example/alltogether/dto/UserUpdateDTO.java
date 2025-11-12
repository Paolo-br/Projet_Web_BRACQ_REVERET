package com.example.alltogether.dto;

import jakarta.validation.constraints.*;

public class UserUpdateDTO {

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    private String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    private String lastName;

    @Email(message = "L'email doit être une adresse valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @Min(value = 1900, message = "L'année de naissance doit être supérieure à 1900")
    @Max(value = 2100, message = "L'année de naissance invalide")
    private Integer yearOfBirth;

    @NotBlank(message = "La ville actuelle est obligatoire")
    private String currentCity;


    private String countryOrigin;

    private String profilePictureUrl;
    private Boolean showParticipationHistory;
    private String instagramUrl;
    private String facebookUrl;
    private String xUrl;

    // Constructeurs
    public UserUpdateDTO() {}

    public UserUpdateDTO(String firstName, String lastName, String email, Integer yearOfBirth,
                         String currentCity, String countryOrigin, String profilePictureUrl,
                         String instagramUrl, String facebookUrl, String xUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.yearOfBirth = yearOfBirth;
        this.currentCity = currentCity;
        this.countryOrigin = countryOrigin;
        this.profilePictureUrl = profilePictureUrl;
        this.instagramUrl = instagramUrl;
        this.facebookUrl = facebookUrl;
        this.xUrl = xUrl;
    }

    // Getters et setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getYearOfBirth() { return yearOfBirth; }
    public void setYearOfBirth(Integer yearOfBirth) { this.yearOfBirth = yearOfBirth; }

    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }

    public String getCountryOrigin() { return countryOrigin; }
    public void setCountryOrigin(String countryOrigin) { this.countryOrigin = countryOrigin; }

    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }

    public Boolean getShowParticipationHistory() { return showParticipationHistory; }
    public void setShowParticipationHistory(Boolean showParticipationHistory) { this.showParticipationHistory = showParticipationHistory; }
    public String getInstagramUrl() { return instagramUrl; }
    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }
    public String getFacebookUrl() { return facebookUrl; }
    public void setFacebookUrl(String facebookUrl) { this.facebookUrl = facebookUrl; }
    public String getXUrl() { return xUrl; }
    public void setXUrl(String xUrl) { this.xUrl = xUrl; }
}