package com.example.alltogether.controller;

import com.example.alltogether.model.Participation;
import com.example.alltogether.service.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/participations")
public class ParticipationController {
    private final ParticipationService participationService;

    @Autowired
    public ParticipationController(ParticipationService participationService) {
        this.participationService = participationService;
    }

    @GetMapping
    public List<Participation> getAllParticipations() {
        return participationService.getAllParticipations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participation> getParticipationById(@PathVariable Long id) {
        Optional<Participation> participation = participationService.getParticipationById(id);
        return participation.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Participation> getParticipationsByUserId(@PathVariable Long userId) {
        return participationService.getParticipationsByUserId(userId);
    }

    @GetMapping("/place/{placeId}")
    public List<Participation> getParticipationsByPlaceId(@PathVariable Long placeId) {
        return participationService.getParticipationsByPlaceId(placeId);
    }

    @PostMapping
    public ResponseEntity<Participation> createParticipation(
            @RequestParam Long userId,
            @RequestParam Long placeId,
            @RequestParam Participation.ParticipationStatus status) {
        try {
            Participation participation = participationService.createParticipation(userId, placeId, status);
            return ResponseEntity.ok(participation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipation(@PathVariable Long id) {
        participationService.deleteParticipation(id);
        return ResponseEntity.noContent().build();
    }
}
