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
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:4200"}, 
             allowedHeaders = "*", 
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    // GET /api/cities
    @GetMapping
    public List<CityDTO> getAllCities() {
        return cityService.getAllCities();
    }

    // GET /api/cities/{id}
    @GetMapping("/{id}")
    public ResponseEntity<CityDTO> getCityById(@PathVariable Long id) {
        return cityService.getCityById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/cities/search?name=...
    @GetMapping("/search")
    public List<CityDTO> searchCitiesByName(@RequestParam String name) {
        return cityService.searchCitiesByName(name);
    }

    // POST /api/cities
    @PostMapping
    public CityDTO createCity(@RequestBody CityDTO cityDTO) {
        return cityService.createCity(cityDTO);
    }

    // PUT /api/cities/{id}
    @PutMapping("/{id}")
    public ResponseEntity<CityDTO> updateCity(@PathVariable Long id, @RequestBody CityDTO cityDTO) {
        return cityService.updateCity(id, cityDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/cities/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
        cityService.deleteCity(id);
        return ResponseEntity.noContent().build();
    }
}
