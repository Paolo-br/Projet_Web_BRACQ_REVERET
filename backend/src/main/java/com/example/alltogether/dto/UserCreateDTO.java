package com.example.alltogether.dto;

import jakarta.validation.constraints.*;

public class UserCreateDTO {

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    private String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    private String lastName;

    @Email(message = "L'email doit être une adresse valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
            message = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre")
    private String password;

    @Min(value = 1900, message = "L'année de naissance doit être supérieure à 1900")
    @Max(value = 2007, message = "Vous devez avoir au moins 18 ans")
    private int yearOfBirth;

    @NotBlank(message = "La ville actuelle est obligatoire")
    private String currentCity;


    private String countryOrigin;

    // Constructeurs, getters et setters...
    public UserCreateDTO() {}

    public UserCreateDTO(String firstName, String lastName, String email, String password,
                         int yearOfBirth, String currentCity, String countryOrigin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.yearOfBirth = yearOfBirth;
        this.currentCity = currentCity;
        this.countryOrigin = countryOrigin;
    }

    // Getters et setters...
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getYearOfBirth() { return yearOfBirth; }
    public void setYearOfBirth(int yearOfBirth) { this.yearOfBirth = yearOfBirth; }

    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }

    public String getCountryOrigin() { return countryOrigin; }
    public void setCountryOrigin(String countryOrigin) { this.countryOrigin = countryOrigin; }
}