package com.example.alltogether.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Participation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    @Temporal(TemporalType.DATE)
    @Column(name = "participation_date", nullable = false)
    private Date participationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParticipationStatus status;

    public enum ParticipationStatus {
        INSCRIT, EN_ATTENTE, REFUSE
    }

    // Constructeurs
    public Participation() {}

    public Participation(UserProfile user, Place place, Date participationDate, ParticipationStatus status) {
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
    public Date getParticipationDate() { return participationDate; }
    public void setParticipationDate(Date participationDate) { this.participationDate = participationDate; }
    public ParticipationStatus getStatus() { return status; }
    public void setStatus(ParticipationStatus status) { this.status = status; }
}
