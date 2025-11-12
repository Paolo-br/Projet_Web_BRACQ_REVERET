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
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ParticipationServiceTest {

    @Mock
    private ParticipationRepository participationRepository;

    @Mock
    private UserProfileRepository userProfileRepository;

    @Mock
    private PlaceRepository placeRepository;

    @InjectMocks
    private ParticipationService participationService;

    private UserProfile user;
    private Place place;
    private Participation participation;

    @BeforeEach
    void setUp() {
        user = new UserProfile();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");

        place = new Place();
        place.setId(1L);
        place.setName("Tour Eiffel");

        participation = new Participation();
        participation.setId(1L);
        participation.setUser(user);
        participation.setPlace(place);
        participation.setParticipationDate(LocalDate.now());
        participation.setStatus(Participation.ParticipationStatus.INSCRIT);
    }

    @Test
    void createParticipation_ShouldSuccess_WhenNoDuplicateExists() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.of(user));
        when(placeRepository.findById(1L)).thenReturn(Optional.of(place));
        when(participationRepository.existsByUserIdAndPlaceIdAndParticipationDate(1L, 1L, LocalDate.now()))
                .thenReturn(false);
        when(participationRepository.save(any(Participation.class))).thenReturn(participation);

        // Act
        ParticipationDTO result = participationService.createParticipation(1L, 1L,
                ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(1L, result.getUserId());
        assertEquals(1L, result.getPlaceId());
        verify(participationRepository, times(1)).save(any(Participation.class));
    }

    @Test
    void createParticipation_ShouldThrowException_WhenDuplicateExists() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.of(user));
        when(placeRepository.findById(1L)).thenReturn(Optional.of(place));
        when(participationRepository.existsByUserIdAndPlaceIdAndParticipationDate(1L, 1L, LocalDate.now()))
                .thenReturn(true);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            participationService.createParticipation(1L, 1L,
                    ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());
        });

        assertEquals("Une participation existe déjà pour cet utilisateur, lieu et date", exception.getMessage());
        verify(participationRepository, never()).save(any(Participation.class));
    }

    @Test
    void createParticipation_ShouldThrowException_WhenUserNotFound() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            participationService.createParticipation(1L, 1L,
                    ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());
        });

        assertEquals("Utilisateur non trouvé", exception.getMessage());
    }

    @Test
    void createParticipation_ShouldThrowException_WhenPlaceNotFound() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.of(user));
        when(placeRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            participationService.createParticipation(1L, 1L,
                    ParticipationDTO.ParticipationStatus.INSCRIT, LocalDate.now());
        });

        assertEquals("Lieu non trouvé", exception.getMessage());
    }

    @Test
    void canUserParticipate_ShouldReturnTrue_WhenNoParticipationExists() {
        // Arrange
        when(participationRepository.existsByUserIdAndPlaceIdAndParticipationDate(1L, 1L, LocalDate.now()))
                .thenReturn(false);

        // Act
        boolean result = participationService.canUserParticipate(1L, 1L, LocalDate.now());

        // Assert
        assertTrue(result);
    }

    @Test
    void canUserParticipate_ShouldReturnFalse_WhenParticipationExists() {
        // Arrange
        when(participationRepository.existsByUserIdAndPlaceIdAndParticipationDate(1L, 1L, LocalDate.now()))
                .thenReturn(true);

        // Act
        boolean result = participationService.canUserParticipate(1L, 1L, LocalDate.now());

        // Assert
        assertFalse(result);
    }

    @Test
    void updateParticipation_ShouldUpdateStatus_WhenParticipationExists() {
        // Arrange
        Participation updatedParticipation = new Participation();
        updatedParticipation.setId(1L);
        updatedParticipation.setUser(user);
        updatedParticipation.setPlace(place);
        updatedParticipation.setParticipationDate(LocalDate.now());
        updatedParticipation.setStatus(Participation.ParticipationStatus.PRESENT);

        when(participationRepository.findById(1L)).thenReturn(Optional.of(participation));
        when(participationRepository.save(any(Participation.class))).thenReturn(updatedParticipation);

        // Act
        Optional<ParticipationDTO> result = participationService.updateParticipation(1L,
                ParticipationDTO.ParticipationStatus.PRESENT);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(ParticipationDTO.ParticipationStatus.PRESENT, result.get().getStatus());
        verify(participationRepository, times(1)).save(participation);
    }

    @Test
    void updateParticipation_ShouldReturnEmpty_WhenParticipationNotFound() {
        // Arrange
        when(participationRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<ParticipationDTO> result = participationService.updateParticipation(1L,
                ParticipationDTO.ParticipationStatus.PRESENT);

        // Assert
        assertFalse(result.isPresent());
        verify(participationRepository, never()).save(any(Participation.class));
    }
}