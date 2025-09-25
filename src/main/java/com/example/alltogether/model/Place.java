package com.example.alltogether.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Column(nullable = false)
    private String category; // Ex: "bar", "musée", "parc"

    @NotBlank
    @Column(nullable = false)
    private String address;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String openingHours;

    @ElementCollection
    @CollectionTable(name = "place_photos", joinColumns = @JoinColumn(name = "place_id"))
    @Column(name = "photo_url")
    private List<String> photos; // Liste d'URLs pointant vers les photos

    @Column(nullable = false)
    private float latitude;

    @Column(nullable = false)
    private float longitude;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    // Constructeurs
    public Place() {}

    public Place(String name, String category, String address, String description,
                 String openingHours, List<String> photos, float latitude, float longitude, City city) {
        this.name = name;
        this.category = category;
        this.address = address;
        this.description = description;
        this.openingHours = openingHours;
        this.photos = photos;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getOpeningHours() { return openingHours; }
    public void setOpeningHours(String openingHours) { this.openingHours = openingHours; }
    public List<String> getPhotos() { return photos; }
    public void setPhotos(List<String> photos) { this.photos = photos; }
    public float getLatitude() { return latitude; }
    public void setLatitude(float latitude) { this.latitude = latitude; }
    public float getLongitude() { return longitude; }
    public void setLongitude(float longitude) { this.longitude = longitude; }
    public City getCity() { return city; }
    public void setCity(City city) { this.city = city; }
}
