package com.example.alltogether.repository;

import com.example.alltogether.model.Category;
import com.example.alltogether.model.Participation;
import com.example.alltogether.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {

    // CORRECTION : Utiliser l'Enum directement, pas String
    List<Place> findByCategory(Category category);  // ← Category, pas String

    List<Place> findByCityId(Long cityId);
    boolean existsByName(String name);

    // Pour les participations
    @Query("SELECT COUNT(p) FROM Participation p WHERE p.place.id = :placeId AND p.participationDate = :date")
    long countByPlaceIdAndDate(@Param("placeId") Long placeId, @Param("date") LocalDate date);

    @Query("SELECT p FROM Participation p WHERE p.user.id = :userId AND p.place.id = :placeId AND p.participationDate = :date")
    Optional<Participation> findByUserIdAndPlaceIdAndParticipationDate(@Param("userId") Long userId, @Param("placeId") Long placeId, @Param("date") LocalDate date);
}