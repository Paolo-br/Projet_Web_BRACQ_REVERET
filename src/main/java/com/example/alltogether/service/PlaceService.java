package com.example.alltogether.service;

import com.example.alltogether.model.Place;
import com.example.alltogether.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Optional<Place> getPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    public List<Place> getPlacesByCityId(Long cityId) {
        return placeRepository.findByCityId(cityId);
    }

    public List<Place> getPlacesByCategory(String category) {
        return placeRepository.findByCategory(category);
    }

    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    public Place updatePlace(Long id, Place placeDetails) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found"));
        place.setName(placeDetails.getName());
        place.setCategory(placeDetails.getCategory());
        place.setAddress(placeDetails.getAddress());
        place.setDescription(placeDetails.getDescription());
        place.setOpeningHours(placeDetails.getOpeningHours());
        place.setPhotos(placeDetails.getPhotos());
        place.setLatitude(placeDetails.getLatitude());
        place.setLongitude(placeDetails.getLongitude());
        return placeRepository.save(place);
    }

    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }
}
