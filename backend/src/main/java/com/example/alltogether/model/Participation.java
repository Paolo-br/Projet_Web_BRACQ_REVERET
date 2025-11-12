package com.example.alltogether.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "place_id", "participation_date"})
        })
public class Participation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    @Temporal(TemporalType.DATE)
    @Column(name = "participation_date", nullable = false)
    private LocalDate participationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParticipationStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "arrival_time")
    private LocalTime arrivalTime;

    public enum ParticipationStatus {
        INSCRIT,
        PRESENT,
        ABSENT,
        ANNULE
    }

    // PrePersist pour setter la date de création
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.participationDate == null) {
            this.participationDate = LocalDate.now();
        }
    }

    // Constructeurs
    public Participation() {}

    public Participation(UserProfile user, Place place, LocalDate participationDate, ParticipationStatus status) {
        this.user = user;
        this.place = place;
        this.participationDate = participationDate;
        this.status = status;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserProfile getUser() { return user; }
    public void setUser(UserProfile user) { this.user = user; }

    public Place getPlace() { return place; }
    public void setPlace(Place place) { this.place = place; }

    public LocalDate getParticipationDate() { return participationDate; }
    public void setParticipationDate(LocalDate participationDate) { this.participationDate = participationDate; }

    public ParticipationStatus getStatus() { return status; }
    public void setStatus(ParticipationStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }
}
