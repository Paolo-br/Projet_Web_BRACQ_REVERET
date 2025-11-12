package com.example.alltogether.controller;


import com.example.alltogether.dto.ParticipationDTO;
import com.example.alltogether.dto.ParticipationDTO.ParticipationStatus;
import com.example.alltogether.service.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * Contrôleur REST pour la gestion des participations.
 *
 * Permet aux utilisateurs de :
 * - Créer des participations à des activités dans des lieux
 * - Consulter leurs participations passées et futures
 * - Modifier le statut de leurs participations
 * - Supprimer des participations
 */
@RestController
@RequestMapping("/api/participations")
public class ParticipationController {

    private final ParticipationService participationService;

    @Autowired
    public ParticipationController(ParticipationService participationService) {
        this.participationService = participationService;
    }

    /**
     * Récupère toutes les participations enregistrées.
     */
    @GetMapping
    public List<ParticipationDTO> getAllParticipations() {
        return participationService.getAllParticipations();
    }

    /**
     * Récupère une participation par son ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ParticipationDTO> getParticipationById(@PathVariable Long id) {
        return participationService.getParticipationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Récupère toutes les participations d'un utilisateur.
     */
    @GetMapping("/user/{userId}")
    public List<ParticipationDTO> getParticipationsByUserId(@PathVariable Long userId) {
        return participationService.getParticipationsByUserId(userId);
    }

    /**
     * Récupère les participations d'un utilisateur pour une date spécifique.
     */
    @GetMapping("/user/{userId}/date/{date}")
    public List<ParticipationDTO> getParticipationsByUserIdAndDate(
            @PathVariable Long userId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return participationService.getParticipationsByUserIdAndDate(userId, date);
    }

    /**
     * Récupère toutes les participations pour un lieu donné.
     */
    @GetMapping("/place/{placeId}")
    public List<ParticipationDTO> getParticipationsByPlaceId(@PathVariable Long placeId) {
        return participationService.getParticipationsByPlaceId(placeId);
    }

    /**
     * Crée une nouvelle participation pour un utilisateur à un lieu.
     * Peut inclure une date et une heure de participation.
     */
    @PostMapping
    public ResponseEntity<?> createParticipation(
            @RequestParam Long userId,
            @RequestParam Long placeId,
            @RequestParam ParticipationStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate participationDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "HH:mm") LocalTime participationTime) {
        try {
            ParticipationDTO participationDTO;
            if (participationDate != null || participationTime != null) {
                // Si l'heure est fournie, appeler la surcharge qui accepte l'heure
                if (participationTime != null) {
                    // Si la date est manquante, utiliser aujourd'hui
                    LocalDate dateToUse = participationDate != null ? participationDate : LocalDate.now();
                    participationDTO = participationService.createParticipation(userId, placeId, status, dateToUse, participationTime);
                } else {
                    participationDTO = participationService.createParticipation(userId, placeId, status, participationDate);
                }
            } else {
                participationDTO = participationService.createParticipation(userId, placeId, status);
            }
            return ResponseEntity.ok(participationDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Met à jour le statut d'une participation existante.
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<ParticipationDTO> updateParticipationStatus(
            @PathVariable Long id,
            @RequestParam ParticipationStatus status) {
        return participationService.updateParticipation(id, status)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Vérifie si un utilisateur peut participer à un lieu pour une date donnée.
     */
    @GetMapping("/check")
    public ResponseEntity<Boolean> canUserParticipate(
            @RequestParam Long userId,
            @RequestParam Long placeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        boolean canParticipate = participationService.canUserParticipate(userId, placeId, date);
        return ResponseEntity.ok(canParticipate);
    }

    /**
     * Supprime une participation par son ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipation(@PathVariable Long id) {
        participationService.deleteParticipation(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Récupère la participation d'un utilisateur pour un lieu spécifique aujourd'hui.
     */
    @GetMapping("/user/{userId}/place/{placeId}/today")
    public ResponseEntity<ParticipationDTO> getUserParticipationForPlaceToday(
            @PathVariable Long userId,
            @PathVariable Long placeId) {
    return participationService.getUserParticipationForPlaceToday(userId, placeId)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.noContent().build());
    }
}
