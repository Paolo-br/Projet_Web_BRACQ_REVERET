package com.example.alltogether.controller;

import com.example.alltogether.dto.CityDTO;
import com.example.alltogether.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des villes.
 * Endpoints publics en GET, protégés par ADMIN pour POST/PUT/DELETE.
 */
@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:4200"}, 
             allowedHeaders = "*", 
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    /**
     * Récupère la liste de toutes les villes.
     */
    @GetMapping
    public List<CityDTO> getAllCities() {
        return cityService.getAllCities();
    }

    /**
     * Récupère une ville par son ID ou son nom.
     * Tente d'abord de parser l'identifiant comme un ID numérique,
     * sinon effectue une recherche par nom.
     */
    @GetMapping("/{identifier}")
    public ResponseEntity<CityDTO> getCityByIdOrName(@PathVariable String identifier) {
        // Essayer d'abord de parser comme un ID numérique
        try {
            Long id = Long.parseLong(identifier);
            return cityService.getCityById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (NumberFormatException e) {
            // Si ce n'est pas un nombre, chercher par nom
            return cityService.getCityByName(identifier)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }
    }

    /**
     * Recherche une ville par son nom exact.
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<CityDTO> getCityByName(@PathVariable String name) {
        return cityService.getCityByName(name)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Recherche des villes dont le nom contient la chaîne fournie.
     */
    @GetMapping("/search")
    public List<CityDTO> searchCitiesByName(@RequestParam String name) {
        return cityService.searchCitiesByName(name);
    }

    /**
     * Crée une nouvelle ville.
     */
    @PostMapping
    public CityDTO createCity(@RequestBody CityDTO cityDTO) {
        return cityService.createCity(cityDTO);
    }

    /**
     * Met à jour les informations d'une ville existante.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CityDTO> updateCity(@PathVariable Long id, @RequestBody CityDTO cityDTO) {
        return cityService.updateCity(id, cityDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Supprime une ville par son ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
        cityService.deleteCity(id);
        return ResponseEntity.noContent().build();
    }
}
