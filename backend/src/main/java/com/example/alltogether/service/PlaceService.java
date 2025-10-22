package com.example.alltogether.service;

import com.example.alltogether.dto.PlaceCreateDTO;
import com.example.alltogether.dto.PlaceDTO;
import com.example.alltogether.model.Category;
import com.example.alltogether.model.City;
import com.example.alltogether.model.Place;
import com.example.alltogether.repository.CityRepository;
import com.example.alltogether.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final CityRepository cityRepository;

    @Autowired
    public PlaceService(PlaceRepository placeRepository, CityRepository cityRepository) {
        this.placeRepository = placeRepository;
        this.cityRepository = cityRepository;
    }

    // GET: Retourne une liste de PlaceDTO
    public List<PlaceDTO> getAllPlaces() {
        return placeRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET: Retourne un Optional<PlaceDTO>
    public Optional<PlaceDTO> getPlaceById(Long id) {
        return placeRepository.findById(id)
                .map(this::toDTO);
    }

    // GET: Retourne une liste de PlaceDTO par cityId
    public List<PlaceDTO> getPlacesByCityId(Long cityId) {
        return placeRepository.findByCityId(cityId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET: Retourne une liste de PlaceDTO par catégorie
    public List<PlaceDTO> getPlacesByCategory(String category) {
        try {
            // Conversion sécurisée de la string vers l'enum
            Category categoryEnum;
            try {
                categoryEnum = Category.valueOf(category.toUpperCase());
            } catch (IllegalArgumentException e) {
                System.out.println("❌ Catégorie invalide: " + category);
                throw new RuntimeException("Catégorie non valide: " + category);
            }

            System.out.println("✅ Recherche lieux avec catégorie: " + categoryEnum);

            List<Place> places = placeRepository.findByCategory(categoryEnum);
            System.out.println("✅ Nombre de lieux trouvés: " + places.size());

            return places.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            System.out.println("❌ Erreur dans getPlacesByCategory: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // POST: Crée une Place à partir d'un DTO
    public PlaceDTO createPlace(PlaceCreateDTO placeCreateDTO) {
        try {
            System.out.println("=== DEBUG CREATE PLACE ===");
            System.out.println("DTO reçu: " + placeCreateDTO);
            System.out.println("Name: " + placeCreateDTO.getName());
            System.out.println("Category: " + placeCreateDTO.getCategory());
            System.out.println("Address: " + placeCreateDTO.getAddress());
            System.out.println("CityId: " + placeCreateDTO.getCityId());

            // Vérifier que la ville existe
            City city = cityRepository.findById(placeCreateDTO.getCityId())
                    .orElseThrow(() -> {
                        System.out.println("❌ Ville non trouvée: " + placeCreateDTO.getCityId());
                        return new RuntimeException("Ville non trouvée");
                    });
            System.out.println("✅ Ville trouvée: " + city.getName());

            // Vérifier l'unicité du nom
            if (placeRepository.existsByName(placeCreateDTO.getName())) {
                System.out.println("❌ Nom déjà existant: " + placeCreateDTO.getName());
                throw new RuntimeException("Un lieu avec ce nom existe déjà");
            }
            System.out.println("✅ Nom unique OK");

            // Créer l'entité
            Place place = new Place();
            place.setName(placeCreateDTO.getName());
            place.setCategory(placeCreateDTO.getCategory());
            place.setAddress(placeCreateDTO.getAddress());
            place.setDescription(placeCreateDTO.getDescription());
            place.setOpeningHours(placeCreateDTO.getOpeningHours());
            place.setLatitude(placeCreateDTO.getLatitude());
            place.setLongitude(placeCreateDTO.getLongitude());
            place.setCity(city);

            System.out.println("✅ Entité Place créée");

            Place savedPlace = placeRepository.save(place);
            System.out.println("✅ Place sauvegardée: " + savedPlace.getId());

            return toDTO(savedPlace);

        } catch (Exception e) {
            System.out.println("❌ ERREUR dans createPlace: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }


    // PUT: Met à jour une Place à partir d'un DTO
    public Optional<PlaceDTO> updatePlaceFromDTO(Long id, PlaceDTO dto) {
        return placeRepository.findById(id)
                .map(place -> {
                    place.setName(dto.getName());
                    place.setCategory(
                            dto.getCategory() != null ?
                                    Category.valueOf(dto.getCategory().toUpperCase()) :
                                    null
                    );
                    place.setAddress(dto.getAddress());
                    place.setDescription(dto.getDescription());
                    place.setOpeningHours(dto.getOpeningHours());
                    place.setPhotos(dto.getPhotos());
                    place.setLatitude(dto.getLatitude());
                    place.setLongitude(dto.getLongitude());
                    if (dto.getCityId() != null) {
                        cityRepository.findById(dto.getCityId())
                                .ifPresentOrElse(
                                        place::setCity,
                                        () -> { throw new RuntimeException("City not found"); }
                                );
                    }
                    Place updated = placeRepository.save(place);
                    return toDTO(updated);
                });
    }

    // DELETE: Supprime une Place
    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }

    // Conversion DTO → Entity
    private Place toEntity(PlaceDTO dto) {
        Place place = new Place();
        place.setName(dto.getName());
        place.setCategory(
                dto.getCategory() != null ?
                        Category.valueOf(dto.getCategory().toUpperCase()) :
                        null
        );
        place.setAddress(dto.getAddress());
        place.setDescription(dto.getDescription());
        place.setOpeningHours(dto.getOpeningHours());
        place.setPhotos(dto.getPhotos());
        place.setLatitude(dto.getLatitude());
        place.setLongitude(dto.getLongitude());
        if (dto.getCityId() != null) {
            cityRepository.findById(dto.getCityId())
                    .ifPresent(place::setCity);
        }
        return place;
    }

    public List<PlaceDTO> searchPlaces(Category category, String cityName) {
        List<Place> places;

        if (category != null && cityName != null) {
            places = placeRepository.findByCategoryAndCity_Name(category, cityName);
        } else if (category != null) {
            places = placeRepository.findByCategory(category);
        } else if (cityName != null) {
            places = placeRepository.findByCityName(cityName);
        } else {
            places = placeRepository.findAll();
        }

        return places.stream().map(this::toDTO).toList();
    }

    // Conversion Entity → DTO
    public PlaceDTO toDTO(Place place) {
        return new PlaceDTO(
                place.getId(),
                place.getName(),
                place.getCategory() != null ? place.getCategory().name() : null,
                place.getAddress(),
                place.getDescription(),
                place.getOpeningHours(),
                place.getPhotos() != null ? place.getPhotos() : List.of(), // Éviter null
                place.getLatitude(),
                place.getLongitude(),
                place.getCity() != null ? place.getCity().getId() : null,
                place.getCity() != null ? place.getCity().getName() : null
        );
    }

    public void addPhotosToPlace(Long placeId, List<String> photoUrls) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Lieu non trouvé"));
        place.getPhotos().addAll(photoUrls);
        placeRepository.save(place);
    }

}
