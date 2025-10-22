package com.example.alltogether.dto;

public class MapCityDTO {
    private Long id;
    private String name;
    private float latitude;
    private float longitude;
    private String pageUrl;

    public MapCityDTO(CityDTO cityDTO) {
        this.id = cityDTO.getId();
        this.name = cityDTO.getName();
        this.latitude = cityDTO.getLatitude();
        this.longitude = cityDTO.getLongitude();
        this.pageUrl = "/cities/" + cityDTO.getId();
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

    public String getPageUrl() { return pageUrl; }
    public void setPageUrl(String pageUrl) { this.pageUrl = pageUrl; }
}
