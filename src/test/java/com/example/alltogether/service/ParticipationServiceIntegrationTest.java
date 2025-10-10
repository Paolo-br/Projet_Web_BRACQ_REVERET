// ParticipationServiceIntegrationTest.java
package com.example.alltogether.service;

import com.example.alltogether.dto.ParticipationDTO;
import com.example.alltogether.model.Participation;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.model.Place;
import com.example.alltogether.repository.ParticipationRepository;
import com.example.alltogether.repository.UserProfileRepository;
import com.example.alltogether.repository.PlaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ParticipationServiceIntegrationTest {

    @Autowired
    private ParticipationService participationService;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ParticipationRepository participationRepository;

    private UserProfile user;
    private Place place;

    @BeforeEach
    void setUp() {
        // Nettoyer la base de données
        participationRepository.deleteAll();
        userProfileRepository.deleteAll();
        placeRepository.deleteAll();

        // Créer un utilisateur de test
        user = new UserProfile();
        user.setFirstName("Test");
        user.setLastName("User");
        user.setEmail("test.user@example.com");
        user.setPassword("password123");
        user.setAge(25);
        user.setCurrentCity("Paris");
        user = userProfileRepository.save(user);

        // Créer un lieu de test
        place = new Place();
        place.setName("Test Place");
        place.setAddress("Test Address");
        place = placeRepository.save(place);
    }

    @Test
    void createParticipation_ShouldPreventDuplicates() {
        // Act - Première participation
        ParticipationDTO participation1 = participationService.createParticipation(
                user.getId(), place.getId(), ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());

        // Assert - Vérifier que la première participation est créée
        assertNotNull(participation1);
        assertEquals(user.getId(), participation1.getUserId());
        assertEquals(place.getId(), participation1.getPlaceId());

        // Act & Assert - Deuxième participation même jour doit échouer
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            participationService.createParticipation(
                    user.getId(), place.getId(), ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());
        });

        assertEquals("Une participation existe déjà pour cet utilisateur, lieu et date", exception.getMessage());

        // Vérifier qu'il n'y a qu'une seule participation
        assertEquals(1, participationRepository.count());
    }

    @Test
    void createParticipation_ShouldAllowDifferentDates() {
        // Act - Participation aujourd'hui
        ParticipationDTO participation1 = participationService.createParticipation(
                user.getId(), place.getId(), ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());

        // Act - Participation demain (doit être autorisée)
        ParticipationDTO participation2 = participationService.createParticipation(
                user.getId(), place.getId(), ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now().plusDays(1));

        // Assert - Les deux participations doivent exister
        assertNotNull(participation1);
        assertNotNull(participation2);
        assertEquals(2, participationRepository.count());
    }

    @Test
    void canUserParticipate_ShouldReturnCorrectStatus() {
        // Act & Assert - Avant création, doit retourner true
        boolean canParticipateBefore = participationService.canUserParticipate(
                user.getId(), place.getId(), LocalDate.now());
        assertTrue(canParticipateBefore);

        // Act - Créer une participation
        participationService.createParticipation(
                user.getId(), place.getId(), ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());

        // Assert - Après création, doit retourner false
        boolean canParticipateAfter = participationService.canUserParticipate(
                user.getId(), place.getId(), LocalDate.now());
        assertFalse(canParticipateAfter);
    }

    @Test
    void getParticipationsByUserId_ShouldReturnUserParticipations() {
        // Arrange - Créer plusieurs participations
        participationService.createParticipation(
                user.getId(), place.getId(), ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());
        participationService.createParticipation(
                user.getId(), place.getId(), ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now().plusDays(1));

        // Act
        var participations = participationService.getParticipationsByUserId(user.getId());

        // Assert
        assertEquals(2, participations.size());
        assertTrue(participations.stream().allMatch(p -> p.getUserId().equals(user.getId())));
    }
}