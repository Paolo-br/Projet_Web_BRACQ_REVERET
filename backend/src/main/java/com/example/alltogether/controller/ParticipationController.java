package com.example.alltogether.controller;


import com.example.alltogether.dto.ParticipationDTO;
import com.example.alltogether.dto.ParticipationDTO.ParticipationStatus;
import com.example.alltogether.service.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    // GET /api/participations
    @GetMapping
    public List<ParticipationDTO> getAllParticipations() {
        return participationService.getAllParticipations();
    }

    // GET /api/participations/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ParticipationDTO> getParticipationById(@PathVariable Long id) {
        return participationService.getParticipationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/participations/user/{userId}
    @GetMapping("/user/{userId}")
    public List<ParticipationDTO> getParticipationsByUserId(@PathVariable Long userId) {
        return participationService.getParticipationsByUserId(userId);
    }

    // GET /api/participations/user/{userId}/date/{date}
    @GetMapping("/user/{userId}/date/{date}")
    public List<ParticipationDTO> getParticipationsByUserIdAndDate(
            @PathVariable Long userId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return participationService.getParticipationsByUserIdAndDate(userId, date);
    }

    // GET /api/participations/place/{placeId}
    @GetMapping("/place/{placeId}")
    public List<ParticipationDTO> getParticipationsByPlaceId(@PathVariable Long placeId) {
        return participationService.getParticipationsByPlaceId(placeId);
    }

    // POST /api/participations
    @PostMapping
    public ResponseEntity<?> createParticipation(
            @RequestParam Long userId,
            @RequestParam Long placeId,
            @RequestParam ParticipationStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate participationDate) {
        try {
            ParticipationDTO participationDTO;
            if (participationDate != null) {
                participationDTO = participationService.createParticipation(userId, placeId, status, participationDate);
            } else {
                participationDTO = participationService.createParticipation(userId, placeId, status);
            }
            return ResponseEntity.ok(participationDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /api/participations/{id}/status
    @PutMapping("/{id}/status")
    public ResponseEntity<ParticipationDTO> updateParticipationStatus(
            @PathVariable Long id,
            @RequestParam ParticipationStatus status) {
        return participationService.updateParticipation(id, status)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/participations/check
    @GetMapping("/check")
    public ResponseEntity<Boolean> canUserParticipate(
            @RequestParam Long userId,
            @RequestParam Long placeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        boolean canParticipate = participationService.canUserParticipate(userId, placeId, date);
        return ResponseEntity.ok(canParticipate);
    }

    // DELETE /api/participations/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipation(@PathVariable Long id) {
        participationService.deleteParticipation(id);
        return ResponseEntity.noContent().build();
    }
}
