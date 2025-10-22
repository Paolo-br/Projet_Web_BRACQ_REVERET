package com.example.alltogether.dto;

import com.example.alltogether.model.Category;
import com.example.alltogether.model.Category;
import jakarta.validation.constraints.*;

public class PlaceCreateDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String name;

    @NotNull(message = "La catégorie est obligatoire")
    private Category category;

    @NotBlank(message = "L'adresse est obligatoire")
    private String address;

    private String description;
    private String openingHours;

    @NotNull(message = "La latitude est obligatoire")
    private Float latitude;
    @NotNull(message = "La longitude est obligatoire")
    private Float longitude;

    @NotNull(message = "La ville est obligatoire")
    @Min(value = 1, message = "L'ID de ville doit être positif")
    private Long cityId;

    // Constructeurs
    public PlaceCreateDTO() {}

    public PlaceCreateDTO(String name, Category category, String address,
                          String description, Long cityId) {
        this.name = name;
        this.category = category;
        this.address = address;
        this.description = description;
        this.cityId = cityId;
    }

    // Getters et setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getOpeningHours() { return openingHours; }
    public void setOpeningHours(String openingHours) { this.openingHours = openingHours; }

    public Float getLatitude() { return latitude; }
    public void setLatitude(Float latitude) { this.latitude = latitude; }

    public Float getLongitude() { return longitude; }
    public void setLongitude(Float longitude) { this.longitude = longitude; }

    public Long getCityId() { return cityId; }
    public void setCityId(Long cityId) { this.cityId = cityId; }
}