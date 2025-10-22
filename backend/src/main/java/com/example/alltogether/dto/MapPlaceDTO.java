package com.example.alltogether.dto;

public class MapPlaceDTO {
    private Long id;
    private String name;
    private float latitude;
    private float longitude;

    public MapPlaceDTO(PlaceDTO placeDTO) {
        this.id = placeDTO.getId();
        this.name = placeDTO.getName();
        this.latitude = placeDTO.getLatitude();
        this.longitude = placeDTO.getLongitude();
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public float getLatitude() { return latitude; }
    public void setLatitude(float latitude) { this.latitude = latitude; }

    public float getLongitude() { return longitude; }
    public void setLongitude(float longitude) { this.longitude = longitude; }
}
