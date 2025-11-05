// PlaceServiceTest.java
package com.example.alltogether.service;

import com.example.alltogether.dto.PlaceCreateDTO;
import com.example.alltogether.dto.PlaceDTO;
import com.example.alltogether.model.Category;
import com.example.alltogether.model.City;
import com.example.alltogether.model.Place;
import com.example.alltogether.repository.CityRepository;
import com.example.alltogether.repository.PlaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PlaceServiceTest {

    @Mock
    private PlaceRepository placeRepository;

    @Mock
    private CityRepository cityRepository;

    @InjectMocks
    private PlaceService placeService;

    private Place place;
    private City city;
    private PlaceCreateDTO placeCreateDTO;
    private PlaceDTO placeDTO;

    @BeforeEach
    void setUp() {
        city = new City();
        city.setId(1L);
        city.setName("Paris");

        place = new Place();
        place.setId(1L);
        place.setName("Tour Eiffel");
        place.setCategory(Category.MONUMENT_HISTORIQUE);
        place.setAddress("Champ de Mars, Paris");
        place.setDescription("Monument emblématique");
        place.setLatitude(48.8584f);
        place.setLongitude(2.2945f);
        place.setCity(city);

        placeCreateDTO = new PlaceCreateDTO();
        placeCreateDTO.setName("Tour Eiffel");
        placeCreateDTO.setCategory(Category.MONUMENT_HISTORIQUE);
        placeCreateDTO.setAddress("Champ de Mars, Paris");
        placeCreateDTO.setDescription("Monument emblématique");
        placeCreateDTO.setCityId(1L);

        placeDTO = new PlaceDTO();
        placeDTO.setName("Tour Eiffel");
        placeDTO.setCategory("MONUMENT_HISTORIQUE");
        placeDTO.setAddress("Champ de Mars, Paris");
        placeDTO.setDescription("Monument emblématique");
        placeDTO.setCityId(1L);
    }

    @Test
    void createPlace_ShouldSuccess_WhenCityExists() {
        // Arrange
        when(cityRepository.findById(1L)).thenReturn(Optional.of(city));
        when(placeRepository.existsByName("Tour Eiffel")).thenReturn(false);
        when(placeRepository.save(any(Place.class))).thenReturn(place);

        // Act
        PlaceDTO result = placeService.createPlace(placeCreateDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Tour Eiffel", result.getName());
        assertEquals("MONUMENT_HISTORIQUE", result.getCategory());
        verify(placeRepository, times(1)).save(any(Place.class));
    }

    @Test
    void createPlace_ShouldThrowException_WhenNameAlreadyExists() {
        // Arrange
        when(cityRepository.findById(1L)).thenReturn(Optional.of(city));
        when(placeRepository.existsByName("Tour Eiffel")).thenReturn(true);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            placeService.createPlace(placeCreateDTO);
        });

        assertEquals("Un lieu avec ce nom existe déjà", exception.getMessage());
        verify(placeRepository, never()).save(any(Place.class));
    }

    @Test
    void createPlace_ShouldThrowException_WhenCityNotFound() {
        // Arrange
        when(cityRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            placeService.createPlace(placeCreateDTO);
        });

        assertEquals("Ville non trouvée", exception.getMessage());
        verify(placeRepository, never()).save(any(Place.class));
    }

    @Test
    void updatePlaceFromDTO_ShouldSuccess_WhenPlaceAndCityExist() {
        // Arrange
        when(placeRepository.findById(1L)).thenReturn(Optional.of(place));
        when(cityRepository.findById(1L)).thenReturn(Optional.of(city));
        when(placeRepository.save(any(Place.class))).thenReturn(place);

        // Act
        Optional<PlaceDTO> result = placeService.updatePlaceFromDTO(1L, placeDTO);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Tour Eiffel", result.get().getName());
        verify(placeRepository, times(1)).save(place);
    }

    @Test
    void updatePlaceFromDTO_ShouldThrowException_WhenCityNotFound() {
        // Arrange
        when(placeRepository.findById(1L)).thenReturn(Optional.of(place));
        when(cityRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            placeService.updatePlaceFromDTO(1L, placeDTO);
        });

        assertEquals("City not found", exception.getMessage());
        verify(placeRepository, never()).save(any(Place.class));
    }

    @Test
    void updatePlaceFromDTO_ShouldReturnEmpty_WhenPlaceNotFound() {
        // Arrange
        when(placeRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<PlaceDTO> result = placeService.updatePlaceFromDTO(1L, placeDTO);

        // Assert
        assertFalse(result.isPresent());
        verify(placeRepository, never()).save(any(Place.class));
    }

    @Test
    void getPlaceById_ShouldReturnPlace_WhenPlaceExists() {
        // Arrange
        when(placeRepository.findById(1L)).thenReturn(Optional.of(place));

        // Act
        Optional<PlaceDTO> result = placeService.getPlaceById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Tour Eiffel", result.get().getName());
    }

    @Test
    void getPlaceById_ShouldReturnEmpty_WhenPlaceNotFound() {
        // Arrange
        when(placeRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<PlaceDTO> result = placeService.getPlaceById(1L);

        // Assert
        assertFalse(result.isPresent());
    }
}