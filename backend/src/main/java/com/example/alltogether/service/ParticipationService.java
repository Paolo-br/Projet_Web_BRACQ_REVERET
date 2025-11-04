package com.example.alltogether.service;

import com.example.alltogether.dto.ParticipationDTO;
import com.example.alltogether.dto.ParticipationDTO.ParticipationStatus;
import com.example.alltogether.model.Participation;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.model.Place;
import com.example.alltogether.repository.ParticipationRepository;
import com.example.alltogether.repository.UserProfileRepository;
import com.example.alltogether.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


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

    // GET: Retourne une liste de ParticipationDTO
    @Transactional(readOnly = true)
    public List<ParticipationDTO> getAllParticipations() {
        return participationRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET: Retourne un Optional<ParticipationDTO>
    @Transactional(readOnly = true)
    public Optional<ParticipationDTO> getParticipationById(Long id) {
        return participationRepository.findById(id)
                .map(this::toDTO);
    }

    // GET: Retourne une liste de ParticipationDTO par userId
    @Transactional(readOnly = true)
    public List<ParticipationDTO> getParticipationsByUserId(Long userId) {
        return participationRepository.findByUserId(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET: Retourne une liste de ParticipationDTO par placeId
    @Transactional(readOnly = true)
    public List<ParticipationDTO> getParticipationsByPlaceId(Long placeId) {
        return participationRepository.findByPlaceId(placeId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET: Récupérer les participations d'un utilisateur pour une date spécifique
    @Transactional(readOnly = true)
    public List<ParticipationDTO> getParticipationsByUserIdAndDate(Long userId, LocalDate date) {
        return participationRepository.findByUserIdAndParticipationDate(userId, date).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Surcharge pour utiliser la date actuelle par défaut
    public ParticipationDTO createParticipation(Long userId, Long placeId, ParticipationStatus status) {
        return createParticipation(userId, placeId, status, LocalDate.now());
    }

    // PUT: Mettre à jour une participation existante
    @Transactional
    public Optional<ParticipationDTO> updateParticipation(Long id, ParticipationStatus newStatus) {
        return participationRepository.findById(id)
                .map(participation -> {
                    participation.setStatus(com.example.alltogether.model.Participation.ParticipationStatus.valueOf(newStatus.name()));
                    Participation updated = participationRepository.save(participation);
                    return toDTO(updated);
                });
    }

    // DELETE: Supprime une Participation
    public void deleteParticipation(Long id) {
        participationRepository.deleteById(id);
    }

    // Compter les participations pour un lieu à une date donnée
    public long countParticipationsByPlaceAndDate(Long placeId, LocalDate date) {
        return participationRepository.countByPlaceIdAndDate(placeId, date);
    }

    // Vérifier si un utilisateur peut participer à un événement (pas de doublon)
    public boolean canUserParticipate(Long userId, Long placeId, LocalDate date) {
        return !participationRepository.existsByUserIdAndPlaceIdAndParticipationDate(userId, placeId, date);
    }

    // Récupérer la participation active d'un utilisateur pour un lieu aujourd'hui
    @Transactional(readOnly = true)
    public Optional<ParticipationDTO> getUserParticipationForPlaceToday(Long userId, Long placeId) {
        LocalDate today = LocalDate.now();
        return participationRepository.findByUserIdAndPlaceIdAndParticipationDate(userId, placeId, today)
                .filter(p -> p.getStatus() == com.example.alltogether.model.Participation.ParticipationStatus.INSCRIT)
                .map(this::toDTO);
    }

    // Conversion Entity → DTO
    public ParticipationDTO toDTO(Participation participation) {
        return new ParticipationDTO(
                participation.getId(),
                participation.getUser().getId(),
                participation.getUser().getFirstName() + " " + participation.getUser().getLastName(),
                participation.getUser().getFirstName(),
                participation.getUser().getLastName(),
                participation.getUser().getEmail(),
                participation.getPlace().getId(),
                participation.getPlace().getName(),
                participation.getParticipationDate(),
                participation.getCreatedAt(),
                ParticipationStatus.valueOf(participation.getStatus().name())
        );
    }
    @Transactional
    public ParticipationDTO createParticipation(Long userId, Long placeId, ParticipationStatus status, LocalDate participationDate) {
        // AJOUTER DU LOGGING POUR DIAGNOSTIQUER
        System.out.println("=== DEBUG CREATE PARTICIPATION ===");
        System.out.println("User ID: " + userId);
        System.out.println("Place ID: " + placeId);
        System.out.println("Status: " + status);
        System.out.println("Date: " + participationDate);

        // Vérifier si l'utilisateur existe
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> {
                    System.out.println("❌ Utilisateur non trouvé: " + userId);
                    return new RuntimeException("Utilisateur non trouvé");
                });
        System.out.println("✅ Utilisateur trouvé: " + user.getEmail());

        // Vérifier si le lieu existe
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> {
                    System.out.println("❌ Lieu non trouvé: " + placeId);
                    return new RuntimeException("Lieu non trouvé");
                });
        System.out.println("✅ Lieu trouvé: " + place.getName());

        // Vérifier s'il n'y a pas déjà une participation
        if (participationRepository.existsByUserIdAndPlaceIdAndParticipationDate(userId, placeId, participationDate)) {
            System.out.println("❌ Participation déjà existante");
            throw new RuntimeException("Une participation existe déjà pour cet utilisateur, lieu et date");
        }

        // Créer la participation
        Participation participation = new Participation();
        participation.setUser(user);
        participation.setPlace(place);
        participation.setParticipationDate(participationDate != null ? participationDate : LocalDate.now());
        participation.setStatus(com.example.alltogether.model.Participation.ParticipationStatus.valueOf(status.name()));

        System.out.println("✅ Création participation...");
        Participation saved = participationRepository.save(participation);
        System.out.println("✅ Participation créée: " + saved.getId());

        return toDTO(saved);
    }
}