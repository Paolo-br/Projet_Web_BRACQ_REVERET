// ParticipationRepository.java
package com.example.alltogether.repository;

import com.example.alltogether.model.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    List<Participation> findByUserId(Long userId);
    List<Participation> findByPlaceId(Long placeId);

    // Vérifier si une participation existe déjà pour un utilisateur, lieu et date
    boolean existsByUserIdAndPlaceIdAndParticipationDate(Long userId, Long placeId, LocalDate participationDate);

    // Trouver une participation spécifique
    Optional<Participation> findByUserIdAndPlaceIdAndParticipationDate(Long userId, Long placeId, LocalDate participationDate);

    // Compter les participations par lieu et date
    @Query("SELECT COUNT(p) FROM Participation p WHERE p.place.id = :placeId AND p.participationDate = :date")
    long countByPlaceIdAndDate(@Param("placeId") Long placeId, @Param("date") LocalDate date);

    // Récupérer les participations d'un utilisateur pour une date spécifique
    List<Participation> findByUserIdAndParticipationDate(Long userId, LocalDate participationDate);
}