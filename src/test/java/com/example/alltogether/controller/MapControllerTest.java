package com.example.alltogether.controller;

import com.example.alltogether.dto.CityDTO;
import com.example.alltogether.dto.MapCityDTO;
import com.example.alltogether.dto.MapPlaceDTO;
import com.example.alltogether.dto.PlaceDTO;
import com.example.alltogether.exception.ResourceNotFoundException;
import com.example.alltogether.service.CityService;
import com.example.alltogether.service.PlaceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MapControllerTest {

    @Mock
    private CityService cityService;

    @Mock
    private PlaceService placeService;

    @InjectMocks
    private MapController mapController;

    private CityDTO sampleCity;
    private List<CityDTO> sampleCities;

    @BeforeEach
    void setUp() {
        sampleCity = new CityDTO();
        sampleCity.setId(1L);
        sampleCity.setName("Paris");
        sampleCity.setLatitude(48.8566f);
        sampleCity.setLongitude(2.3522f);

        sampleCities = Arrays.asList(sampleCity);
    }

    @Test
    void getAllCitiesForMap_WithCities_ReturnsOkAndCities() {
        when(cityService.getAllCities()).thenReturn(sampleCities);

        ResponseEntity<List<MapCityDTO>> response = mapController.getAllCitiesForMap();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());

        MapCityDTO responseCity = response.getBody().get(0);
        assertEquals(sampleCity.getId(), responseCity.getId());
        assertEquals(sampleCity.getName(), responseCity.getName());
        assertEquals(sampleCity.getLatitude(), responseCity.getLatitude());
        assertEquals(sampleCity.getLongitude(), responseCity.getLongitude());
        assertEquals("/cities/" + sampleCity.getId(), responseCity.getPageUrl());
    }

    @Test
    void getAllCitiesForMap_WithNoCities_ReturnsNoContent() {
        when(cityService.getAllCities()).thenReturn(Collections.emptyList());

        ResponseEntity<List<MapCityDTO>> response = mapController.getAllCitiesForMap();

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void getPlacesForCity_WithValidCityId_ReturnsOkAndPlaces() {
        Long cityId = 1L;
        when(cityService.getCityById(cityId)).thenReturn(Optional.of(sampleCity));
        when(placeService.getPlacesByCityId(cityId)).thenReturn(Arrays.asList(
            createSamplePlaceDTO(1L, "Tour Eiffel", 48.8584f, 2.2945f)
        ));

        ResponseEntity<List<MapPlaceDTO>> response = mapController.getPlacesForCity(cityId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void getPlacesForCity_WithInvalidCityId_ThrowsResourceNotFoundException() {
        Long invalidCityId = 999L;
        when(cityService.getCityById(invalidCityId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
            mapController.getPlacesForCity(invalidCityId)
        );
    }

    @Test
    void getPlacesForCity_WithNoPlaces_ReturnsNoContent() {
        Long cityId = 1L;
        when(cityService.getCityById(cityId)).thenReturn(Optional.of(sampleCity));
        when(placeService.getPlacesByCityId(cityId)).thenReturn(Collections.emptyList());

        ResponseEntity<List<MapPlaceDTO>> response = mapController.getPlacesForCity(cityId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
    }

    private PlaceDTO createSamplePlaceDTO(Long id, String name, float latitude, float longitude) {
        PlaceDTO placeDTO = new PlaceDTO();
        placeDTO.setId(id);
        placeDTO.setName(name);
        placeDTO.setLatitude(latitude);
        placeDTO.setLongitude(longitude);
        return placeDTO;
    }
}
