package com.example.alltogether.controller;

import com.example.alltogether.dto.PlaceCreateDTO;
import com.example.alltogether.dto.PlaceDTO;
import com.example.alltogether.model.Category;
import com.example.alltogether.service.PlaceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Contrôleur REST pour la gestion des lieux.
 * Endpoints publics en GET, protégés par ADMIN pour POST/PUT/DELETE.
 */
@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:4200"}, 
             allowedHeaders = "*", 
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PlaceController {

    private final PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }


    // GET /api/places/{id}
    @GetMapping("/{id}")
    public ResponseEntity<PlaceDTO> getPlaceById(@PathVariable Long id) {
        return placeService.getPlaceById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/places/city/{cityId}
    @GetMapping("/city/{cityId}")
    public List<PlaceDTO> getPlacesByCityId(@PathVariable Long cityId) {
        return placeService.getPlacesByCityId(cityId);
    }

    // GET /api/places/category/{category}
    @GetMapping("/category/{category}")
    public List<PlaceDTO> getPlacesByCategory(@PathVariable String category) {
        return placeService.getPlacesByCategory(category);
    }

    // POST /api/places
    @PostMapping
    public ResponseEntity<?> createPlace(@Valid @RequestBody PlaceCreateDTO placeCreateDTO, BindingResult bindingResult) {
        try {
            // Afficher les erreurs de validation
            if (bindingResult.hasErrors()) {
                System.out.println("ERREURS DE VALIDATION DTO:");
                bindingResult.getFieldErrors().forEach(error -> {
                    System.out.println(" - " + error.getField() + ": " + error.getDefaultMessage() + " (valeur: " + error.getRejectedValue() + ")");
                });
                return ResponseEntity.badRequest().body("Erreurs de validation: " + bindingResult.getAllErrors());
            }

            System.out.println("DTO VALIDÉ - Passage au service");
            PlaceDTO createdPlace = placeService.createPlace(placeCreateDTO);
            return ResponseEntity.ok(createdPlace);

        } catch (Exception e) {
            System.out.println("EXCEPTION dans createPlace: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erreur: " + e.getMessage());
        }
    }
    // PUT /api/places/{id}
    @PutMapping("/{id}")
    public ResponseEntity<PlaceDTO> updatePlace(@PathVariable Long id, @RequestBody PlaceDTO dto) {
        return placeService.updatePlaceFromDTO(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/places/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long id) {
        placeService.deletePlace(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<PlaceDTO>> getPlaces(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String city) {

        if (category != null || city != null) {
            // Mode recherche
            List<PlaceDTO> results = placeService.searchPlaces(
                    category != null ? Category.fromString(category) : null,
                    city
            );
            return ResponseEntity.ok(results);
        } else {
            // Mode liste complète
            List<PlaceDTO> allPlaces = placeService.getAllPlaces();
            return ResponseEntity.ok(allPlaces);
        }
    }
}
