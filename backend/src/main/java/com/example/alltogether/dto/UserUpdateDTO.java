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

    @Min(value = 18, message = "L'âge minimum est 18 ans")
    @Max(value = 100, message = "L'âge maximum est 100 ans")
    private Integer age;

    @NotBlank(message = "La ville actuelle est obligatoire")
    private String currentCity;


    private String countryOrigin;

    private String profilePictureUrl;

    // Constructeurs
    public UserUpdateDTO() {}

    public UserUpdateDTO(String firstName, String lastName, String email, Integer age,
                         String currentCity, String countryOrigin, String profilePictureUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.currentCity = currentCity;
        this.countryOrigin = countryOrigin;
        this.profilePictureUrl = profilePictureUrl;
    }

    // Getters et setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer  getAge() { return age; }
    public void setAge(Integer  age) { this.age = age; }

    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }

    public String getCountryOrigin() { return countryOrigin; }
    public void setCountryOrigin(String countryOrigin) { this.countryOrigin = countryOrigin; }

    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }
}