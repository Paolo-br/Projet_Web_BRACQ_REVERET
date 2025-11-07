package com.example.alltogether.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "user_profile")
public class UserProfile implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String firstName;

    @NotBlank
    @Column(nullable = false)
    private String lastName;


    @Email
    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String password;

    @Min(1900)
    @Max(2100)
    @Column(name = "year_of_birth")
    private int yearOfBirth;

    @NotBlank
    @Column(name = "current_city", nullable = false)
    private String currentCity;

    private String countryOrigin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participation> participations = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles = new HashSet<>();

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @Column(name = "instagram_url")
    private String instagramUrl;

    @Column(name = "facebook_url")
    private String facebookUrl;

    @Column(name = "x_url")
    private String xUrl;

    @Column(name = "show_participation_history")
    private Boolean showParticipationHistory = true;

    //Constructeur sans encodage automatique du mot de passe
    public UserProfile() {}

    public UserProfile(String firstName, String lastName, String email, String password,
                       int yearOfBirth, String currentCity, String countryOrigin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password; // L'encodage sera fait dans le service
        this.yearOfBirth = yearOfBirth;
        this.currentCity = currentCity;
        this.countryOrigin = countryOrigin;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    
    // Méthode pour calculer l'âge dynamiquement
    public int getAge() {
        return java.time.Year.now().getValue() - yearOfBirth;
    }
    
    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }
    public String getCountryOrigin() { return countryOrigin; }
    public void setCountryOrigin(String countryOrigin) { this.countryOrigin = countryOrigin; }
    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }
    public String getInstagramUrl() { return instagramUrl; }
    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }
    public String getFacebookUrl() { return facebookUrl; }
    public void setFacebookUrl(String facebookUrl) { this.facebookUrl = facebookUrl; }
    public String getXUrl() { return xUrl; }
    public void setXUrl(String xUrl) { this.xUrl = xUrl; }
    public List<Participation> getParticipations() { return participations; }
    public void setParticipations(List<Participation> participations) { this.participations = participations; }

    public Boolean getShowParticipationHistory() { return showParticipationHistory == null ? true : showParticipationHistory; }
    public void setShowParticipationHistory(Boolean showParticipationHistory) { this.showParticipationHistory = showParticipationHistory; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // Ajouter "ROLE_" prefix
                .collect(Collectors.toList());
    }

    // Méthode utilitaire pour vérifier les rôles
    public boolean hasRole(String role) {
        return roles.contains(role);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public void setRoles(String role) {
        this.roles.clear();
        this.roles.add(role);
    }

    public void addRole(String role) {
        roles.add(role);
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    // Méthode pour vérifier si l'utilisateur est admin
    public boolean isAdmin() {
        return roles.contains("ADMIN");
    }

    // Méthode pour promouvoir un utilisateur admin
    public void promoteToAdmin() {
        roles.add("ADMIN");
    }

    // Méthode pour retirer les droits admin
    public void demoteToUser() {
        roles.remove("ADMIN");
        roles.add("USER");
    }


}