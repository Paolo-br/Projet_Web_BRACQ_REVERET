package com.example.alltogether.controller;

import com.example.alltogether.dto.MapCityDTO;
import com.example.alltogether.dto.MapPlaceDTO;
import com.example.alltogether.exception.ResourceNotFoundException;
import com.example.alltogether.service.CityService;
import com.example.alltogether.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/map")
public class MapController {

    private final CityService cityService;
    private final PlaceService placeService;

    @Autowired
    public MapController(CityService cityService, PlaceService placeService) {
        this.cityService = cityService;
        this.placeService = placeService;
    }

    @GetMapping("/cities")
    public ResponseEntity<List<MapCityDTO>> getAllCitiesForMap() {
        var cities = cityService.getAllCities()
            .stream()
            .map(MapCityDTO::new)
            .collect(Collectors.toList());

        if (cities.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(cities);
    }

    @GetMapping("/city/{cityId}/places")
    public ResponseEntity<List<MapPlaceDTO>> getPlacesForCity(@PathVariable Long cityId) {
        // Vérifier d'abord si la ville existe
        cityService.getCityById(cityId)
            .orElseThrow(() -> new ResourceNotFoundException("City not found with id: " + cityId));

        var places = placeService.getPlacesByCityId(cityId)
            .stream()
            .map(MapPlaceDTO::new)
            .collect(Collectors.toList());

        if (places.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(places);
    }
}
