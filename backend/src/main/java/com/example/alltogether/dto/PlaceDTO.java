// PlaceDTO.java
package com.example.alltogether.dto;

import java.util.List;

public class PlaceDTO {
    private Long id;
    private String name;
    private String category;     // Ex: bar, musée, parc
    private String address;
    private String description;
    private String openingHours;
    private List<String> photos; // URLs des photos
    private float latitude;
    private float longitude;
    private Long cityId;         // Référence à la ville (évite de charger City entière)
    private String cityName;     // Optionnel: utile pour affichage direct
    private Integer participationCount; // Nombre de participations aujourd'hui

    public PlaceDTO() {}

    public PlaceDTO(Long id, String name, String category, String address,
                    String description, String openingHours, List<String> photos,
                    float latitude, float longitude, Long cityId, String cityName) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.address = address;
        this.description = description;
        this.openingHours = openingHours;
        this.photos = photos;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cityId = cityId;
        this.cityName = cityName;
        this.participationCount = 0;
    }

    public PlaceDTO(Long id, String name, String category, String address,
                    String description, String openingHours, List<String> photos,
                    float latitude, float longitude, Long cityId, String cityName,
                    Integer participationCount) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.address = address;
        this.description = description;
        this.openingHours = openingHours;
        this.photos = photos;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cityId = cityId;
        this.cityName = cityName;
        this.participationCount = participationCount;
    }

    // Getters & Setters
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

    public Long getCityId() { return cityId; }
    public void setCityId(Long cityId) { this.cityId = cityId; }

    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }

    public Integer getParticipationCount() { return participationCount; }
    public void setParticipationCount(Integer participationCount) { this.participationCount = participationCount; }
}
