package com.example.alltogether.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class ParticipationDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private Long placeId;
    private String placeName;
    private LocalDate participationDate;
    private LocalDateTime createdAt;
    private LocalTime arrivalTime;
    private ParticipationStatus status;

    public enum ParticipationStatus {
        INSCRIT, PRESENT, ABSENT, ANNULE
    }

    // Constructeurs
    public ParticipationDTO() {}

    public ParticipationDTO(Long id, Long userId, String userName, Long placeId, String placeName,
                            LocalDate participationDate, LocalDateTime createdAt, LocalTime arrivalTime, ParticipationStatus status) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.placeId = placeId;
        this.placeName = placeName;
        this.participationDate = participationDate;
        this.createdAt = createdAt;
        this.arrivalTime = arrivalTime;
        this.status = status;
    }
    
    public ParticipationDTO(Long id, Long userId, String userName, String userFirstName, String userLastName, 
                            String userEmail, Long placeId, String placeName,
                            LocalDate participationDate, LocalDateTime createdAt, LocalTime arrivalTime, ParticipationStatus status) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.placeId = placeId;
        this.placeName = placeName;
        this.participationDate = participationDate;
        this.createdAt = createdAt;
        this.arrivalTime = arrivalTime;
        this.status = status;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserFirstName() { return userFirstName; }
    public void setUserFirstName(String userFirstName) { this.userFirstName = userFirstName; }

    public String getUserLastName() { return userLastName; }
    public void setUserLastName(String userLastName) { this.userLastName = userLastName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public Long getPlaceId() { return placeId; }
    public void setPlaceId(Long placeId) { this.placeId = placeId; }

    public String getPlaceName() { return placeName; }
    public void setPlaceName(String placeName) { this.placeName = placeName; }

    public LocalDate getParticipationDate() { return participationDate; }
    public void setParticipationDate(LocalDate participationDate) { this.participationDate = participationDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }

    public ParticipationStatus getStatus() { return status; }
    public void setStatus(ParticipationStatus status) { this.status = status; }
}