package com.example.alltogether.service;

import com.example.alltogether.model.Participation;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.model.Place;
import com.example.alltogether.repository.ParticipationRepository;
import com.example.alltogether.repository.UserProfileRepository;
import com.example.alltogether.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ParticipationService {
    private final ParticipationRepository participationRepository;
    private final UserProfileRepository userProfileRepository;
    private final PlaceRepository placeRepository;

    @Autowired
    public ParticipationService(ParticipationRepository participationRepository,
                                UserProfileRepository userProfileRepository,
                                PlaceRepository placeRepository) {
        this.participationRepository = participationRepository;
        this.userProfileRepository = userProfileRepository;
        this.placeRepository = placeRepository;
    }

    public List<Participation> getAllParticipations() {
        return participationRepository.findAll();
    }

    public Optional<Participation> getParticipationById(Long id) {
        return participationRepository.findById(id);
    }

    public List<Participation> getParticipationsByUserId(Long userId) {
        return participationRepository.findByUserId(userId);
    }

    public List<Participation> getParticipationsByPlaceId(Long placeId) {
        return participationRepository.findByPlaceId(placeId);
    }

    public Participation createParticipation(Long userId, Long placeId, Participation.ParticipationStatus status) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Place not found"));

        Participation participation = new Participation();
        participation.setUser(user);
        participation.setPlace(place);
        participation.setParticipationDate(new Date());
        participation.setStatus(status);

        return participationRepository.save(participation);
    }

    public void deleteParticipation(Long id) {
        participationRepository.deleteById(id);
    }
}
