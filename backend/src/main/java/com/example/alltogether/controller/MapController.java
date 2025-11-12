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

/**
 * Contrôleur REST pour les endpoints de carte interactive.
 * Fournit les données nécessaires pour afficher les villes et lieux sur une carte.
 */
@RestController
@RequestMapping("/api/map")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:4200"}, 
             allowedHeaders = "*", 
             methods = {RequestMethod.GET, RequestMethod.OPTIONS})
public class MapController {

    private final CityService cityService;
    private final PlaceService placeService;

    @Autowired
    public MapController(CityService cityService, PlaceService placeService) {
        this.cityService = cityService;
        this.placeService = placeService;
    }

    /**
     * Récupère toutes les villes avec leurs coordonnées GPS pour la carte de France.
     * 
     * @return Liste des villes avec id, nom, coordonnées et URL de la page
     */
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

    /**
     * Récupère tous les lieux d'une ville spécifique pour la carte de la ville.
     * 
     * @param cityId L'identifiant de la ville
     * @return Liste des lieux avec id, nom et coordonnées GPS
     * @throws ResourceNotFoundException si la ville n'existe pas
     */
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
